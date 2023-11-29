import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1700578977463 implements MigrationInterface {
  name = ' $npmConfigName1700578977463';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_entity" ADD "scheduled_deletion" TIMESTAMP`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_entity" DROP COLUMN "scheduled_deletion"`,
    );
  }
}
