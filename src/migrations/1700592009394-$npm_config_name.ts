import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1700592009394 implements MigrationInterface {
  name = ' $npmConfigName1700592009394';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_entity" DROP CONSTRAINT "FK_0adfaab968ff5933af5ac929230"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_entity" ALTER COLUMN "post_id" DROP NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_entity" ADD CONSTRAINT "FK_0adfaab968ff5933af5ac929230" FOREIGN KEY ("post_id") REFERENCES "post_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "like_entity" DROP CONSTRAINT "FK_0adfaab968ff5933af5ac929230"`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_entity" ALTER COLUMN "post_id" SET NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "like_entity" ADD CONSTRAINT "FK_0adfaab968ff5933af5ac929230" FOREIGN KEY ("post_id") REFERENCES "post_entity"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
