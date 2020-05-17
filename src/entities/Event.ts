import { Entity, BaseEntity, PrimaryColumn, Column } from 'typeorm';

// Ставка НДС для платежного АПИ
export enum NDS {
    None = 'nds_none',
    Nds0 = 'nds_0',
    Nds10 = 'nds_10',
    Nds10110 = 'nds_10_110',
    Nds20 = 'nds_20',
    Nds20120 = 'nds_20_120',
}

export enum Currency {
    RUB = 'RUB'
}

@Entity()
export default class Event extends BaseEntity {
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
