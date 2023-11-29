import { MigrationInterface, QueryRunner } from "typeorm";

export class  $npmConfigName1700859030381 implements MigrationInterface {
    name = ' $npmConfigName1700859030381'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" SET DEFAULT 'http://localhost:9090/dasdasdas/b1626c71fd5fca698d1c14b213d9a92e.png'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "avatar" SET DEFAULT 'http://localhost:9090/dasdasdas/03c2a870006958849ec214623bcc3050.jpg'`);
    }

}
