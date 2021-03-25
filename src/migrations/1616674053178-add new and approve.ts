import {MigrationInterface, QueryRunner} from "typeorm";

export class addNewAndApprove1616674053178 implements MigrationInterface {
    name = 'addNewAndApprove1616674053178'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "disease-report" ADD "new" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "disease-report" ADD "approve" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drug-report" ADD "new" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "drug-report" ADD "approve" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nutrition-report" ADD "new" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "nutrition-report" ADD "approve" boolean NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "nutrition-report" DROP COLUMN "approve"`);
        await queryRunner.query(`ALTER TABLE "nutrition-report" DROP COLUMN "new"`);
        await queryRunner.query(`ALTER TABLE "drug-report" DROP COLUMN "approve"`);
        await queryRunner.query(`ALTER TABLE "drug-report" DROP COLUMN "new"`);
        await queryRunner.query(`ALTER TABLE "disease-report" DROP COLUMN "approve"`);
        await queryRunner.query(`ALTER TABLE "disease-report" DROP COLUMN "new"`);
    }

}
