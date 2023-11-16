import { MigrationInterface, QueryRunner } from "typeorm"

export class  $npmConfigName1700064310500 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        INSERT INTO "carBrand" (brand) VALUES 
        ('TOYOTA'),
        ('HONDA'),
        ('FORD');
        `) 
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "carBrand"
        `);
    }

}
