/* eslint-disable quotes */
import { MigrationInterface, QueryRunner } from "typeorm";

export class AddEvents1588154999685 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`INSERT INTO "event" VALUES 
    ('event-cinema-id2', 70, 'RUB', 'nds_20', 'Полицейский с Рублёвки. Новогодний беспредел 2'),
    ('event-cinema-id3', 50, 'RUB', 'nds_none', 'Джуманджи: Новый уровень'),
    ('event-cinema-id4', 50, 'RUB', 'nds_20', 'Фиксики против кработов'),
    ('event-cinema-id5', 70, 'RUB', 'nds_none', 'Холоп'),
    ('event-cinema-id6', 50, 'RUB', 'nds_20', 'Холодное сердце 2'),
    ('event-cinema-id7', 50, 'RUB', 'nds_none', 'Иван Царевич и Серый Волк 4'),
    ('event-cinema-id8', 100, 'RUB', 'nds_none', 'Чёрное Рождество'),
    ('event-cinema-id9', 100, 'RUB', 'nds_none', 'Рождество на двоих'),
    ('event-cinema-id10', 100, 'RUB', 'nds_none', 'Достать ножи'),
    ('event-concert-id1', 1280, 'RUB', 'nds_none', 'Лариса Долина'),
    ('event-concert-id2', 300, 'RUB', 'nds_20', 'Антропоценфония. Песни машин и механизмов'),
    ('event-concert-id3', 3500, 'RUB', 'nds_none', 'Jethro Tull'),
    ('event-concert-id4', 700, 'RUB', 'nds_none', 'The Jazz Loft'),
    ('event-concert-id5', 100, 'RUB', 'nds_none', 'Хор Московской консерватории'),
    ('event-concert-id6', 300, 'RUB', 'nds_20', 'V Фестиваль классической музыки памяти Наума Штаркмана'),
    ('event-concert-id7', 500, 'RUB', 'nds_none', 'Kremlin'),
    ('event-concert-id8', 900, 'RUB', 'nds_none', 'Вейланд Родд'),
    ('event-concert-id9', 430, 'RUB', 'nds_none', 'Kle2Go'),
    ('event-concert-id10', 100, 'RUB', 'nds_none', 'Класс доцента А.В. Анчевской (скрипка')`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DELETE
                                 FROM "event"
                                 WHERE id IN ('event-cinema-id2',
                                              'event-cinema-id3',
                                              'event-cinema-id4',
                                              'event-cinema-id5',
                                              'event-cinema-id6',
                                              'event-cinema-id7',
                                              'event-cinema-id8',
                                              'event-cinema-id9',
                                              'event-cinema-id10',
                                              'event-concert-id1',
                                              'event-concert-id2',
                                              'event-concert-id3',
                                              'event-concert-id4',
                                              'event-concert-id5',
                                              'event-concert-id6',
                                              'event-concert-id7',
                                              'event-concert-id8',
                                              'event-concert-id9',
                                              'event-concert-id10')`);
    }
}
