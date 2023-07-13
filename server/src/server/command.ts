import { Command, Executable } from '@bleed-believer/commander';
import { Espresso } from '@bleed-believer/espresso';
import express, { json, urlencoded } from 'express';
import helmet from 'helmet';
import cors from 'cors';

import { Appconfig, type AppconfigStruct } from '@tool/appconfig/index.js';
import { EndpointsRouting } from './endpoints/routing.js';
import { dataSource } from '@/data-source.js';
import { logger } from '@/logger.js';

@Command({
    name: 'Web Server',
    path: 'server'
})
export class ServerCommand implements Executable {
    #conf!: AppconfigStruct;

    async start(): Promise<void> {
        this.#conf = await Appconfig.load();
        const rest = express();

        // Set static paths
        rest.use(express.static(this.#conf.client));

        // Allow certain paths for CORS
        rest.options('api/translate', cors());
        rest.options('api/language', cors());

        // Other configurations
        rest.use(json({ type: 'application/json', strict: true }));
        rest.use(urlencoded({ extended: true }));
        rest.use(helmet());
        
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
            this.#conf.port,
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