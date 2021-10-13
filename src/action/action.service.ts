import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, getManager } from 'typeorm';
import { ActionEntity } from './action.entity';
import { ActionRepository } from './action.repository';
import { CreateActionDto } from './dtos/create-action.dto';
import { UpdateActionDto } from './dtos/update-action.dto';

@Injectable()
export class ActionService {

    constructor(
        @InjectRepository(ActionRepository)
        private actionRepository: ActionRepository,
        @InjectConnection()
        private connection: Connection
    ) { }

    /**
   * this function returns all actions
   * @param  
   * @returns actionRepository.allActions if job done successfully
   */
    allActions() {
        return this.actionRepository.allActions();
    }

    /**
   * this function returns one action
   * @param  id
   * @returns actionRepository.findSingleAction if job done successfully
   */
    findSingleAction(id) {
        return this.actionRepository.findSingleAction(id);
    }

    /**
* this function delete one action
* @param  id
* @returns actionRepository.deleteAction if job done successfully
*/
    async deleteAction(id) {
        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const ids = await this.actionRepository.getAllActionChildsIds(id, queryRunner)
            await this.actionRepository.deleteAction(ids, queryRunner);
            await this.actionRepository.updateParentProcess(id, queryRunner);
            await queryRunner.commitTransaction();
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException()
        } finally {
            await queryRunner.release()
        }

    }

    /**
* this function create one action
* @param  CreateActionDto
* @returns actionRepository.createAction if job done successfully
*/
    async createAction(createActionDto: CreateActionDto) {

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const action = await this.actionRepository.createAction(createActionDto,queryRunner);
            await this.actionRepository.updateParentProcess(action.id,queryRunner);
            await queryRunner.commitTransaction();
            return action;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException()
        } finally {
            await queryRunner.release()
        }
    }

    /**
* this function update one action
* @param  UpdateActionDto
* @returns actionRepository.updateAction if job done successfully
*/
    async updateAction(updateActionDto: UpdateActionDto) {

        const queryRunner = this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction();
        try {
            const action = await this.actionRepository.updateAction(updateActionDto,queryRunner);
            await this.actionRepository.updateParentProcess(updateActionDto.id,queryRunner);
            
            await queryRunner.commitTransaction();
            return action;
        } catch (error) {
            await queryRunner.rollbackTransaction();
            throw new InternalServerErrorException()
        } finally {
            await queryRunner.release()
        }
    }
}
