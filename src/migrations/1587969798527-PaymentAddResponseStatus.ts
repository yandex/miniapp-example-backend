/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentAddResponseStatus1587969798527 implements MigrationInterface {
    name = 'PaymentAddResponseStatus1587969798527'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event"
            ADD "title" character varying NOT NULL DEFAULT ''`);
        await queryRunner.query(`UPDATE "event"
            SET "title" = 'Звёздные Войны: Скайуокер. Восход'
            WHERE "id" = 'event-cinema-id1'`);
        await queryRunner.query(`ALTER TABLE "event"
            ALTER COLUMN "title" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "payment"
            ADD "apiPaymentId" integer`);
        await queryRunner.query(`CREATE TYPE "payment_apiresponsestatus_enum" AS ENUM('success', 'fail')`);
        await queryRunner.query(`ALTER TABLE "payment"
            ADD "apiResponseStatus" "payment_apiresponsestatus_enum"`);
        await queryRunner.query(`ALTER TABLE "payment"
            ALTER COLUMN "status" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment"
            ALTER COLUMN "status" DROP DEFAULT`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment"
            ALTER COLUMN "status" SET DEFAULT 'new'`);
        await queryRunner.query(`ALTER TABLE "payment"
            ALTER COLUMN "status" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "payment"
            DROP COLUMN "apiResponseStatus"`);
        await queryRunner.query(`DROP TYPE "payment_apiresponsestatus_enum"`);
        await queryRunner.query(`ALTER TABLE "payment"
            DROP COLUMN "apiId"`);
        await queryRunner.query(`ALTER TABLE "event"
            DROP COLUMN "title"`);
    }
}
