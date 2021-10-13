import { MeetingEntity } from "src/meeting/meeting.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "ACTIONS" })
export class ActionEntity {
    @PrimaryGeneratedColumn({ name: 'ID' })
    id: number;

    @Column({ name: 'DAT_CREATED_ACTION', default: true })
    datCreatedAction: Date;

    @Column({ name: 'NAM_CREATED_ACTION', default: true })
    namCreatedAction: string;

    @Column({ name: 'DAT_MODIFIED_ACTION', default: true })
    datModifiedAction: Date;

    @Column({ name: 'NAM_MODIFIED_ACTION', default: true })
    namModifiedAction: string;

    @Column({ name: 'FLG_ACTIVE_ACTION', default: true })
    flgActiveAction: number;

    @Column({ name: 'NUM_STATUS_ACTION', default: true })
    numStatusAction: number;



    @Column({ name: 'NAM_DES_ACTION', default: true })
    namDesAction: string;

    @Column({ name: 'NAM_REPORT_ACTION', default: true })
    namReportAction: string;

    @Column({ name: 'DAT_DEADLINE_ACTION', default: true })
    datDeadlineAction: Date;

    @Column({ name: 'DAT_START_ACTION', default: true })
    datStartAction: Date;

    @Column({ name: 'DAT_END_ACTION', default: true })
    datEndAction: Date;

    @Column({ name: 'NUM_PROGRESS_ACTION', default: true })
    numProgressAction: number;



    @Column({ name: 'LKP_IDE_MEET_ACTION' })
    lkpIdeMeetAction: number;

    @Column({ name: 'NUM_PARENT_ID_ACTION' })
    numParentIdAction: number;



    @ManyToOne(type => MeetingEntity, meet => meet.actions)
    @JoinColumn({ name: 'LKP_IDE_MEET_ACTION' })
    meeting: MeetingEntity;

    @OneToMany(type => ActionEntity, req => req.parent)
    childs: ActionEntity[];

    @ManyToOne(type => ActionEntity, req => req.childs, { nullable: true })
    @JoinColumn({ name: 'NUM_PARENT_ID_ACTION' })
    parent: ActionEntity;

 
}