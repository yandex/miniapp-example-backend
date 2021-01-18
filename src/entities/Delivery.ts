import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

import { NDS, Currency } from '../lib/payment';

@Entity()
export default class Delivery extends BaseEntity {
    @PrimaryColumn()
    id!: string;

    @Column()
    title!: string;

    @Column()
    price!: number;

    @Column({
        type: 'enum',
        enum: Currency,
        default: Currency.RUB,
    })
    currency!: Currency;

    @Column({
        type: 'enum',
        enum: NDS,
        default: NDS.None,
    })
    nds!: NDS;
}
