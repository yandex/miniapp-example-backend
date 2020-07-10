/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class PaymentUserInfo1592486452435 implements MigrationInterface {
    name = 'PaymentUserInfo1592486452435'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ADD "userInfo" text`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" DROP COLUMN "userInfo"`, undefined);
    }
}
