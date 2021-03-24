import {MigrationInterface, QueryRunner} from "typeorm";

export class update1616567764911 implements MigrationInterface {
    name = 'update1616567764911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ADD "language" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "language"`);
    }

}
