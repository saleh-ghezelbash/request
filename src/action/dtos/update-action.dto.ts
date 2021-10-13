import { Max, Min } from "class-validator";

export class UpdateActionDto{
    id:number;
    namDesAction: string;
    namReportAction: string;
    datDeadlineAction: Date;
    datStartAction: Date;
    datEndAction: Date;

    @Max(100)
    @Min(0)
    numProgressAction: number;

   
}