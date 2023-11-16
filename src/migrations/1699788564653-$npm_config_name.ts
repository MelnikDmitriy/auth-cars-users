import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1699788564653 implements MigrationInterface {
  name = ' $npmConfigName1699788564653';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "surname" TO "sur_name"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" RENAME COLUMN "sur_name" TO "surname"`,
    );
  }
}
