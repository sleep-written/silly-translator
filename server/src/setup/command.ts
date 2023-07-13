import { Command, Executable } from '@bleed-believer/commander';

import { Appconfig } from '@tool/appconfig/index.js';
import { logger } from '@/logger.js';

@Command({
    name: 'Setup Application',
    path: 'setup'
})
export class SetupCommand implements Executable {
    async start(): Promise<void> {
        logger.info('Generando "./appconfig.yml"...');
        await Appconfig.save({
            port: 8000,
            query: 'div.result-container',
            client: '../client/dist/client'
        });
        logger.info('Archivo "./appconfig.yml" generado correctamente!');
    }
}