import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1700556912163 implements MigrationInterface {
  name = ' $npmConfigName1700556912163';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_entity" ADD "deleted_at" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_entity" DROP COLUMN "deleted_at"`,
    );
  }
}
