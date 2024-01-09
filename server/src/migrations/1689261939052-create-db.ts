import type { MigrationInterface, QueryRunner } from "typeorm";

export class CreateDb1689261939052 implements MigrationInterface {
    name = 'CreateDb1689261939052'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Language" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "cod" varchar(4) NOT NULL, "description" varchar(128) NOT NULL)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Language"`);
    }

}
