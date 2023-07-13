import { logger } from '@/logger.js';
import { Command, Executable } from '@bleed-believer/commander';
import { seeders } from './seeders/index.js';
import { dataSource } from '@/data-source.js';

@Command({
    name: 'Seeds loader',
    path: 'seeds'
})
export class SeedsCommand implements Executable {
    async start(): Promise<void> {
        logger.info('Conectando con DB...');
        await dataSource.initialize();
        
        logger.info('Cargando semillas...');
        await dataSource.transaction('SERIALIZABLE', async m => {
            for (const seederClass of seeders) {
                const seeder = new seederClass(m);
                logger.info(`Ejecutando subproceso de semillas "${seederClass.name}"...`);
                await seeder.start();
            }
        });

        logger.info('Semillas cargadas correctamente!');
    }
}