/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddDeliveries1608657494745 implements MigrationInterface {
    name = 'AddDeliveries1608657494745'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "delivery" VALUES
                                ('mail', 'Почта России', 0, 'RUB', 'nds_none'),
                                ('courier', 'Курьер', 100, 'RUB', 'nds_none')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "delivery" WHERE id IN ('mail', 'courier')`);
    }
}
