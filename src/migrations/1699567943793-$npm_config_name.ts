import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1699567943793 implements MigrationInterface {
  name = ' $npmConfigName1699567943793';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post_entity" DROP COLUMN "images"`);
    await queryRunner.query(`ALTER TABLE "post_entity" ADD "images" jsonb`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post_entity" DROP COLUMN "images"`);
    await queryRunner.query(
      `ALTER TABLE "post_entity" ADD "images" character varying NOT NULL`,
    );
  }
}
