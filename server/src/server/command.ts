import type { Executable } from '@bleed-believer/commander';

import { json, urlencoded } from 'express';
import { Espresso } from '@bleed-believer/espresso';
import { Command } from '@bleed-believer/commander';

import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { EndpointsRouting } from './endpoints/routing.js';
import { Environment } from 'environment.js';
import { dataSource } from 'data-source.js';
import { logger } from 'logger.js';

@Command({
    name: 'Web Server',
    path: 'server'
})
export class ServerCommand implements Executable {
    #env = new Environment();

    async start(): Promise<void> {
        const rest = express();

        // Allow certain paths for CORS
        rest.options('api/translate', cors());
        rest.options('api/language', cors());

        // Other configurations
        rest.use(json({ type: 'application/json', strict: true }));
        rest.use(urlencoded({ extended: true }));
        rest.use(helmet({
            contentSecurityPolicy: {
                directives: {
                    ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                    upgradeInsecureRequests: null,
                }
            }
        }));
        
        const espr = new Espresso(rest, {
            lowercase: true,
            verbose: true
        });
        
        // Inject routings
        espr.inject(EndpointsRouting);
        espr.onError(this.onError.bind(this));

        // Initialize server
        await dataSource.initialize();
        rest.listen(
            this.#env.port,
            '0.0.0.0',
            this.onReady.bind(this)
        );
    }

    onReady(): void {
        logger.info('Web Service ready!');
    }

    onError(err: Error, _: express.Request, res: express.Response): void {
        logger.error(err.message);
        res.statusCode = 500;
        res.json({
            title: 'Server Error',
            message: err.message
        });
    }
}