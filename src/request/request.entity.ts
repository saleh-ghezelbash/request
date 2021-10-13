import { MeetingEntity } from "src/meeting/meeting.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:"REQUESTS"})
export class RequestEntity{
    @PrimaryGeneratedColumn({ name: 'ID'})
    id: number;

    @Column({ name: 'DAT_CREATED_REQ', default: true })
    datCreatedReq: Date;
  
    @Column({ name: 'NAM_CREATED_REQ', default: true })
    namCreatedReq: string;
  
    @Column({ name: 'DAT_MODIFIED_REQ', default: true })
    datModifiedReq: Date;
  
    @Column({ name: 'NAM_MODIFIED_REQ', default: true })
    namModifiedReq: string;

    @Column({ name: 'FLG_ACTIVE_REQ', default: true })
    flgActiveReq: number;

    @Column({ name: 'NUM_STATUS_REQ', default: true })
    numStatusReq: number;



    @Column({ name: 'DAT_REQUEST_REQ', default: true })
    datRequestReq: Date;

    @Column({ name: 'NUM_TYPE_REQ', default: true })
    numTypeReq: number;

    @Column({ name: 'NAM_OWN_REQ', default: true })
    namOwnReq: string;

    

    @OneToOne(type => MeetingEntity, meet => meet.lkpIdeReqMeet,{eager:true})
    meeting: MeetingEntity;
}