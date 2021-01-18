/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDeliveryEntity1608655917844 implements MigrationInterface {
    name = 'AddDeliveryEntity1608655917844'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "delivery_currency_enum" AS ENUM('RUB')`, undefined);
        await queryRunner.query(`CREATE TYPE "delivery_nds_enum" AS ENUM('nds_none', 'nds_0', 'nds_10', 'nds_10_110', 'nds_20', 'nds_20_120')`);
        await queryRunner.query(`CREATE TABLE "delivery"
                                (
                                    "id" character varying NOT NULL,
                                    "title" character varying NOT NULL,
                                    "price" integer NOT NULL,
                                    "currency" "delivery_currency_enum" NOT NULL DEFAULT 'RUB',
                                    "nds" "delivery_nds_enum" NOT NULL DEFAULT 'nds_none',
                                    CONSTRAINT "PK_ffad7bf84e68716cd9af89003b0" PRIMARY KEY ("id")
                                )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "delivery"`, undefined);
        await queryRunner.query(`DROP TYPE "delivery_nds_enum"`, undefined);
        await queryRunner.query(`DROP TYPE "delivery_currency_enum"`, undefined);
    }
}
