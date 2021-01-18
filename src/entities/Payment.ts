import {
    Entity,
    BaseEntity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    ManyToOne,
} from 'typeorm';

import { ApiResponseStatus } from '../lib/payment';
import Event from './Event';

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
    address?: string;
};

@Entity()
export default class Payment extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        nullable: true,
    })
    apiPaymentId?: number;

    @Column({
        nullable: true,
    })
    userId?: string;

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
