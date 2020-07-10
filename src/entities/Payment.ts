import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';

import Event from './Event';
import { ApiResponseStatus } from '../lib/payment';

export enum Status {
    New = 'new',
    InModeration = 'in_moderation',
    Held = 'held',
    InProgress = 'in_progress',
    ModerationNegative = 'moderation_negative',
    InCancel = 'in_cancel',
    Canceled = 'canceled',
    Rejected = 'rejected',
    Paid = 'paid',
}

export type UserInfo = {
    name?: string;
    email?: string;
    phone?: string;
};

@Entity()
export default class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: true,
    })
    apiPaymentId?: number;

    @Column()
    userId!: string;

    @Column({
        type: 'simple-json',
        nullable: true,
    })
    userInfo?: UserInfo;

    @Column({
        type: 'enum',
        enum: Status,
        nullable: true,
    })
    status?: Status;

    @Column({
        type: 'enum',
        enum: ApiResponseStatus,
        nullable: true,
    })
    apiResponseStatus?: ApiResponseStatus;

    @ManyToOne(() => Event)
    event!: Event;

    @Column()
    amount!: number;

    @Column()
    cost!: number;

    @CreateDateColumn()
    createdAt!: Date;
}
