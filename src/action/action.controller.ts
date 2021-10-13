import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ActionService } from './action.service';
import { CreateActionDto } from './dtos/create-action.dto';
import { UpdateActionDto } from './dtos/update-action.dto';

@Controller('action')
@ApiTags('request')
export class ActionController {
    constructor(private actionService:ActionService){}

      /**
   * this function returns all actions
   * @param  
   * @returns actionService.allActions if job done successfully
   */
    @Get()
    @ApiOperation({
        summary: 'Get All Actions',
        description: 'Get All Actions Description'
    })
    allActions(){
        return this.actionService.allActions();
    }

      /**
   * this function returns one action
   * @param  id
   * @returns actionService.findSingleAction if job done successfully
   */
    @Get('/:id')
    findSingleAction(@Param('id') id:number){
        return this.actionService.findSingleAction(id);
    }

      /**
   * this function delete one action
   * @param  id
   * @returns actionService.deleteAction if job done successfully
   */
    @Delete('/:id')
    deleteAction(@Param('id') id:number){
        return this.actionService.deleteAction(id);
    }

      /**
   * this function create one action
   * @param  CreateActionDto
   * @returns actionService.createAction if job done successfully
   */
    @Post()
    createAction(@Body() createActionDto:CreateActionDto){
        return this.actionService.createAction(createActionDto)
    }

      /**
   * this function update one action
   * @param  UpdateActionDto
   * @returns actionService.updateAction if job done successfully
   */
    @Put()
    updateAction(@Body() updateActionDto:UpdateActionDto){
        return this.actionService.updateAction(updateActionDto);
    }
}
