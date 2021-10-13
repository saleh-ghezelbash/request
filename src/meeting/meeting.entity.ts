import { ActionEntity } from "src/action/action.entity";
import { RequestEntity } from "src/request/request.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "MEETS" })
export class MeetingEntity {
    @PrimaryGeneratedColumn({ name: 'ID'})
    id: number;

    @Column({ name: 'DAT_CREATED_MEET', default: true })
    datCreatedMeet: Date;

    @Column({ name: 'NAM_CREATED_MEET', default: true })
    namCreatedMeet: string;

    @Column({ name: 'DAT_MODIFIED_MEET', default: true })
    datModifiedMeet: Date;

    @Column({ name: 'NAM_MODIFIED_MEET', default: true })
    namModifiedMeet: string;

    @Column({ name: 'FLG_ACTIVE_MEET', default: true })
    flgActiveMeet: number;

    @Column({ name: 'NUM_STATUS_MEET', default: true })
    numStatusMeet: number;



    @Column({ name: 'DAT_MEETING_MEET', default: true })
    datMeetingMeet: Date;

    @Column({ name: 'NAM_TITLE_MEET', default: true })
    namTitleMeet: string;

    @Column({ name: 'NAM_SUBJECT_MEET', default: true })
    namSubjectMeet: string;

    @Column({ name: 'NAM_KEY_WORD_MEET', default: true })
    namKeyWordMeet: string;



    @OneToOne(type => RequestEntity, req => req.meeting)
    @JoinColumn({ name: 'LKP_IDE_REQ_MEET' })
    lkpIdeReqMeet: RequestEntity;

    @OneToMany(type => ActionEntity, action => action.meeting)
    actions:ActionEntity[];
}