import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1699874121188 implements MigrationInterface {
  name = ' $npmConfigName1699874121188';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sur_name"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "surname" character varying(30) NOT NULL`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "deleted_at" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "credentials" ADD "deleted_at" TIMESTAMP`,
    );
    await queryRunner.query(`ALTER TABLE "cars" ADD "deleted_at" TIMESTAMP`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "cars" DROP COLUMN "deleted_at"`);
    await queryRunner.query(
      `ALTER TABLE "credentials" DROP COLUMN "deleted_at"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "deleted_at"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "surname"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "sur_name" character varying(30) NOT NULL`,
    );
  }
}
