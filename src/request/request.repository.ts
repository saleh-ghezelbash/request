import { EntityRepository, Repository } from "typeorm";
import { CreateReqDto } from "./dtos/createReqDto";
import { UpdateReqDto } from "./dtos/updateReqDto";
import { RequestEntity } from "./request.entity";

@EntityRepository(RequestEntity)
export class RequestRepository extends Repository<RequestEntity>{

    /**
   * this function returns all request
   * @param  
   * @returns result if job done successfully
   */
  async allRequests() {

    // ساختن کوئری
    const query = this.createQueryBuilder('req')
      .leftJoinAndSelect('req.meeting', 'meeting')
      .leftJoinAndSelect('meeting.actions', 'actions')
      .leftJoinAndSelect('actions.childs', 'childs')
      .andWhere('req.flgActiveReq = :isActive', { isActive: 1 })
      .getMany();

    // اجرا و بازگرداندن نتیجه کوئری
    return await query;

    // return this.find({
    //   // relations: ['meeting', 'meeting.actions'] 
    // });
  }

     /**
   * this function returns one request
   * @param  id
   * @returns result if job done successfully
   */
  async findSingleRequest(id) {
     // ساختن کوئری
    const query = this.createQueryBuilder('req')
    .leftJoinAndSelect('req.meeting', 'meeting')
    .leftJoinAndSelect('meeting.actions', 'actions')
    .leftJoinAndSelect('actions.childs', 'childs')
    .where('req.id = :id',{id})
    .andWhere('req.flgActiveReq = :isActive', { isActive: 1 })
    .getOne();

    // اجرا و بازگرداندن نتیجه کوئری
  return await query;


    // return await this.findOne({
    //   where: {
    //     id: id,
    //     flgActiveReq: 1
    //   }
    // })
  }

   /**
   * this function delete one request
   * @param  id
   * @returns ok if job done successfully
   */
  async deleteRequest(id) {
    // آپدیت فیلد flgActiveReq درخواست
    await this.update(id, {
      datModifiedReq: new Date(),
      namModifiedReq: 'saleh',
      flgActiveReq: 0,
    });
    
    return 'ok';
  }

      /**
   * this function create one request
   * @param  CreateReqDto
   * @returns result if job done successfully
   */
  async createRequest(createReqDto: CreateReqDto): Promise<any> {

    // مقداردهی فیلدهای دیفالت
    createReqDto.datCreatedReq = new Date();
    createReqDto.namCreatedReq = 'saleh';
    createReqDto.flgActiveReq = 1;
    createReqDto.numStatusReq = 1;

    //  const result = this.create({
    //     datCreatedReq:new Date(),
    //     namCreatedReq : 'saleh',
    //     // datModifiedReq : null,
    //     namModifiedReq : "",
    //     flgActiveReq : 1,
    //     numStatusReq : 1
    //   })

    //   console.log('result:',result);

    // ذخیره داده های ورودی در دیتابیس
    return await this.save(createReqDto);



    // const query = this.createQueryBuilder('req')
    //   .insert()
    //   .into(RequestEntity)
    //   .values({
    //     datCreatedReq: new Date(),
    //     namCreatedReq: 'saleh',
    //     // datModifiedReq : null,
    //     namModifiedReq: "",
    //     flgActiveReq: 0,
    //     numStatusReq: 1
    //   })
    //   .execute();

    // return await query;


  }

      /**
   * this function update one request
   * @param  UpdateReqDto
   * @returns result if job done successfully
   */
  async updateRequest(updateReqDto: UpdateReqDto) {
    // const obj =  {
    //   datModifiedReq: new Date(),
    //   namModifiedReq: 'mehran',
    //     numTypeReq: updateReqDto.numTypeReq,
    //     namOwnReq: updateReqDto.namOwnReq,
    //     datRequestReq: updateReqDto.datRequestReq,
    //   };

    //  return await this.update(updateReqDto.id,obj);

    // ذخیره داده های ورودی در دیتابیس
    return await this.save(
      {
        id: updateReqDto.id,
        datModifiedReq: new Date(),
        namModifiedReq: 'mehran',
        numTypeReq: updateReqDto.numTypeReq,
        namOwnReq: updateReqDto.namOwnReq,
        datRequestReq: updateReqDto.datRequestReq,
      }
    );
  }
}