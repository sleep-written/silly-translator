import { Language } from '@entities/language.entity.js';
import { EntityWritter, Seeder } from '../core/index.js';

export class LanguageSeeder extends Seeder {
    async start(): Promise<void> {
        const writter = new EntityWritter(Language, 'cod', this.manager);
        await writter.initialize();

        await writter.createOrUpdate({
            cod: 'es',
            description: 'Español'
        });

        await writter.createOrUpdate({
            cod: 'en',
            description: 'Inglés'
        });

        await writter.createOrUpdate({
            cod: 'ja',
            description: 'Japonés'
        });

        await writter.save();
    }
}