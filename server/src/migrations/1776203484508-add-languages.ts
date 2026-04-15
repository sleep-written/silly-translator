import type { MigrationInterface, QueryRunner } from 'typeorm';

import { Language } from '@entities/language.entity.js';

export class AddLanguages1776203484508 implements MigrationInterface {

    public async up(qr: QueryRunner): Promise<void> {
        await qr.manager.save(Language, {
            cod: 'es',
            description: 'Español'
        });

        await qr.manager.save(Language, {
            cod: 'en',
            description: 'Inglés'
        });

        await qr.manager.save(Language, {
            cod: 'ja',
            description: 'Japonés'
        });
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.manager.deleteAll(Language);
    }
}
