import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateReqDto } from './dtos/createReqDto';
import { UpdateReqDto } from './dtos/updateReqDto';
import { RequestRepository } from './request.repository';

@Injectable()
export class RequestService {
    constructor(
        @InjectRepository(RequestRepository)
        private requestRepository: RequestRepository,
      ) {}


        /**
   * this function returns all request
   * @param  
   * @returns requestRepository.allRequests if job done successfully
   */
    allRequests(){
        return this.requestRepository.allRequests();
    }

   /**
   * this function returns one request
   * @param  id
   * @returns requestRepository.findSingleRequest if job done successfully
   */
    findSingleRequest(id){
        return this.requestRepository.findSingleRequest(id);
    }

       /**
   * this function delete one request
   * @param  id
   * @returns requestRepository.deleteRequest if job done successfully
   */
    deleteRequests(id){
        return this.requestRepository.deleteRequest(id);
    }

      /**
   * this function create one request
   * @param  CreateReqDto
   * @returns requestRepository.createRequest if job done successfully
   */
    createRequest(createReqDto:CreateReqDto){
        return this.requestRepository.createRequest(createReqDto);
    }

      /**
   * this function update one request
   * @param  UpdateReqDto
   * @returns requestRepository.updateRequest if job done successfully
   */
    updateRequest(updateReqDto:UpdateReqDto){
        return this.requestRepository.updateRequest(updateReqDto);
    }
}
