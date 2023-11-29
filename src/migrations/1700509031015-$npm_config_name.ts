import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1700509031015 implements MigrationInterface {
  name = ' $npmConfigName1700509031015';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar" SET DEFAULT 'http://localhost:9090/dasdasdas/03c2a870006958849ec214623bcc3050.jpg'`,
    );
    await queryRunner.query(`ALTER TABLE "post_entity" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "post_entity" ADD "date" TIMESTAMP NOT NULL DEFAULT now()`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "post_entity" DROP COLUMN "date"`);
    await queryRunner.query(
      `ALTER TABLE "post_entity" ADD "date" date NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ALTER COLUMN "avatar" SET DEFAULT ''`,
    );
  }
}
