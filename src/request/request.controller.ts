import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { ApiBadRequestResponse, ApiExtraModels, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateReqDto } from './dtos/createReqDto';
import { UpdateReqDto } from './dtos/updateReqDto';
import { RequestService } from './request.service';

@Controller('request')
@ApiTags('request')
// @ApiExtraModels(DeleteHrsCardReqDto)
export class RequestController {
    constructor(private reqService:RequestService){}

   /**
   * this function returns all request
   * @param  
   * @returns reqService.allRequests if job done successfully
   */
    @Get()
    @ApiOperation({
        summary: 'Get All Requests',
        description: 'Get All Requests Description'
    })
    allRequests(){
        return this.reqService.allRequests();
    }

     /**
   * this function returns one request
   * @param  id
   * @returns reqService.findSingleRequest if job done successfully
   */
    @Get('/:id')
    @ApiOperation({
        summary: 'Get One Request',
        description: 'Get One Request Description'
    })
    @ApiParam({
        name: 'id',
        required: true,
      })
    findSingleRequest(@Param('id') id:number){
        return this.reqService.findSingleRequest(id);
    }

     /**
   * this function delete one request
   * @param  id
   * @returns reqService.deleteRequests if job done successfully
   */
      @ApiOperation({
        summary: 'Delete One Request',
        description: 'Delete One Request Description'
    })
    @ApiParam({
        name: 'id',
        required: true,
      })
    @Delete('/:id')
    deleteRequest(@Param('id') id:number){
        return this.reqService.deleteRequests(id);
    }

     /**
   * this function create one request
   * @param  CreateReqDto
   * @returns reqService.createRequest if job done successfully
   */
      @ApiOperation({
        summary: 'Create One Request',
        description: 'Create One Request Description'
    })
    @ApiOkResponse()
    @ApiBadRequestResponse()
    @ApiNotFoundResponse()
    @Post()
    createRequest(@Body(ValidationPipe) createReqDto:CreateReqDto){
        return this.reqService.createRequest(createReqDto);
    }

     /**
   * this function update one request
   * @param  UpdateReqDto
   * @returns reqService.updateRequest if job done successfully
   */
    @Put()
    @ApiOperation({
        summary: 'Update One Request',
        description: 'Update One Request Description'
    })
    @ApiParam({
        name: 'id',
        required: true,
      })
    updateRequest(@Body() updateReqDto:UpdateReqDto){
        return this.reqService.updateRequest(updateReqDto);
    }
}
