import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1699786539571 implements MigrationInterface {
    name = ' $npmConfigName1699786539571'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "roles" TO "role"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(30) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "post_entity" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "post_entity" ADD "text" character varying(150) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_entity" DROP COLUMN "text"`);
        await queryRunner.query(`ALTER TABLE "post_entity" ADD "text" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(15) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" RENAME COLUMN "role" TO "roles"`);
    }

}
