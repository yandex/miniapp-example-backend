/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from 'typeorm';

export class insertEvents1587558919264 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "event" VALUES ('event-cinema-id1', 100, 'RUB', 'nds_none')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE FROM "event" WHERE id='event-cinema-id1'`);
    }
}
