/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class ChangeUserIdType1609277182669 implements MigrationInterface {
    name = 'ChangeUserIdType1609277182669'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "userId" DROP NOT NULL`, undefined);
        await queryRunner.query(`UPDATE "payment" SET "userId" = null WHERE "userId" = ''`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`UPDATE "payment" SET "userId" = '' WHERE "userId" is null`, undefined);
        await queryRunner.query(`ALTER TABLE "payment" ALTER COLUMN "userId" SET NOT NULL`, undefined);
    }
}
