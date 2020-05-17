/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1587558875683 implements MigrationInterface {
    name = 'init1587558875683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "event_currency_enum" AS ENUM('RUB')`);
        await queryRunner.query(`CREATE TYPE "event_nds_enum" AS ENUM('nds_none', 'nds_0', 'nds_10', 'nds_10_110', 'nds_20', 'nds_20_120')`);
        await queryRunner.query(`CREATE TABLE "event"
                                 (
                                     "id"       character varying     NOT NULL,
                                     "price"    integer               NOT NULL,
                                     "currency" "event_currency_enum" NOT NULL DEFAULT 'RUB',
                                     "nds"      "event_nds_enum"      NOT NULL DEFAULT 'nds_none',
                                     CONSTRAINT "PK_30c2f3bbaf6d34a55f8ae6e4614" PRIMARY KEY ("id")
                                 )`);
        await queryRunner.query(`CREATE TYPE "payment_status_enum" AS ENUM(
                                    'new', 
                                    'in_moderation', 
                                    'held', 
                                    'in_progress', 
                                    'moderation_negative', 
                                    'in_cancel', 
                                    'canceled',
                                    'rejected',
                                    'paid'
                                 )`);
        await queryRunner.query(`CREATE TABLE "payment"
                                 (
                                     "id"        SERIAL                NOT NULL,
                                     "userId"    integer               NOT NULL,
                                     "status"    "payment_status_enum" NOT NULL DEFAULT 'new',
                                     "amount"    integer               NOT NULL,
                                     "cost"      integer               NOT NULL,
                                     "createdAt" TIMESTAMP             NOT NULL DEFAULT now(),
                                     "eventId"   character varying,
                                     CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id")
                                 )`);
        await queryRunner.query(`ALTER TABLE "payment"
            ADD CONSTRAINT "FK_7acc01aea1ff8f19abf62781770" FOREIGN KEY ("eventId") REFERENCES "event" ("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE "payment" DROP CONSTRAINT "FK_7acc01aea1ff8f19abf62781770"', undefined);
        await queryRunner.query('DROP TABLE "payment"', undefined);
        await queryRunner.query('DROP TYPE "payment_status_enum"', undefined);
        await queryRunner.query('DROP TABLE "event"', undefined);
        await queryRunner.query('DROP TYPE "event_nds_enum"', undefined);
        await queryRunner.query('DROP TYPE "event_currency_enum"', undefined);
    }
}
