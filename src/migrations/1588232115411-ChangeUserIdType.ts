/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserIdType1588232115411 implements MigrationInterface {
    name = 'ChangeUserIdType1588232115411'
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment"
            ALTER COLUMN "userId" TYPE character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment"
            ALTER COLUMN "userId" TYPE integer`, undefined);
    }
}
