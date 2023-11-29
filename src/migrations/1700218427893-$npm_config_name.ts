import { MigrationInterface, QueryRunner } from 'typeorm';

export class $npmConfigName1700218427893 implements MigrationInterface {
  name = ' $npmConfigName1700218427893';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "post_entity" DROP CONSTRAINT "FK_5dc797c0bc4641fe248d5cb2caa"`,
    );
    await queryRunner.query(
      `CREATE TABLE "like_entity" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "post_id" uuid NOT NULL, "user_id" uuid, CONSTRAINT "PK_ec99081fd251116d14aad5ad0e6" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(`ALTER TABLE "post_entity" DROP COLUMN "like"`);
    await queryRunner.query(
      `ALTER TABLE "like_entity" ADD CONSTRAINT "FK_e12fd39fa5c0856dc583e166ffd" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
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
      `ALTER TABLE "like_entity" DROP CONSTRAINT "FK_e12fd39fa5c0856dc583e166ffd"`,
    );
    await queryRunner.query(`ALTER TABLE "post_entity" ADD "like" uuid`);
    await queryRunner.query(`DROP TABLE "like_entity"`);
    await queryRunner.query(
      `ALTER TABLE "post_entity" ADD CONSTRAINT "FK_5dc797c0bc4641fe248d5cb2caa" FOREIGN KEY ("like") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
