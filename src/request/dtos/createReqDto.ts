import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateReqDto {  
    @ApiProperty({required:false})
    datCreatedReq: Date;

    @ApiProperty({required:false})
    namCreatedReq: string;

    @ApiProperty({required:false})
    flgActiveReq: number;

    @ApiProperty({required:false})
    numStatusReq: number;

    @IsNotEmpty()
    @ApiProperty()
    datRequestReq: Date;

    @IsNotEmpty()
    @ApiProperty()
    numTypeReq: number;

    @IsNotEmpty()
    @ApiProperty()
    namOwnReq: string;
}