import { Max, Min } from "class-validator";

export class CreateActionDto{
    namDesAction: string;
    namReportAction: string;
    datDeadlineAction: Date;
    datStartAction: Date;
    datEndAction: Date;

    lkpIdeMeetAction: number;
    numParentIdAction: number|null;
}