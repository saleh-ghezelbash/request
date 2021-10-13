import { EntityRepository, QueryRunner, Repository } from "typeorm";
import { ActionEntity } from "./action.entity";
import { CreateActionDto } from "./dtos/create-action.dto";
import { UpdateActionDto } from "./dtos/update-action.dto";

@EntityRepository(ActionEntity)
export class ActionRepository extends Repository<ActionEntity>{

  /**
* this function returns all actions
* @param  
* @returns result if job done successfully
*/
  async allActions() {
    // ساختن کوئری
    const query = this.createQueryBuilder('act')
      .where('act.flgActiveAction = :isActive', { isActive: 1 })
      .leftJoinAndSelect('act.childs', 'childs', 'childs.flgActiveAction = :isActiveChild', { isActiveChild: 1 })
      // .andWhere('childs.flgActiveAction = :isActiveChild', { isActiveChild: 1 })
      .getMany();

    // اجرا و بازگرداندن نتیجه کوئری
    return await query;

    // return this.find({loadEagerRelations:true,relations:['childs','parent']});
  }

  /**
 * this function returns one action
 * @param  id
 * @returns result if job done successfully
 */
  async findSingleAction(id) {


    // // this.commit(id)
    // const ids = await this.getAllActionChildsIds(id)
    // // console.log('ids:', ids);
    // this.deleteAction(ids);




    // ساختن کوئری
    const query = this.createQueryBuilder('act')
      .leftJoinAndSelect('act.childs', 'childs')
      .where('act.id = :id', { id })
      .andWhere('act.flgActiveAction = :isActive', { isActive: 1 })
      .getOne();

    // اجرا و بازگرداندن نتیجه کوئری
    return await query;


    // return await this.findOne({
    //   where:{
    //     id:id, 
    //     flgActiveAction: 1 
    //   }})
  }

  /**
 * this function delete one action
 * @param  id
 * @returns ok if job done successfully
 */
  async deleteAction(ids: number[], queryRunner?: QueryRunner) {
    // آپدیت فیلد flgActiveAction درخواست
    const result =
      queryRunner == null
        ? await this.update(ids, {
          datModifiedAction: new Date(),
          namModifiedAction: 'saleh',
          flgActiveAction: 0,
        })
        : await queryRunner.manager.update(ActionEntity, ids, {
          datModifiedAction: new Date(),
          namModifiedAction: 'saleh',
          flgActiveAction: 0,
        })


    return 'ok';

  }

  /**
 * this function create one action
 * @param  CreateActionDto
 * @returns result if job done successfully
 */
  async createAction(createActionDto: CreateActionDto, queryRunner?: QueryRunner) {
    // مقداردهی فیلدهای دیفالت
    const action = this.create({
      datCreatedAction: new Date(),
      namCreatedAction: 'saleh',
      datModifiedAction: new Date(),
      namModifiedAction: 'saleh',
      flgActiveAction: 1,
      numStatusAction: 1,


      namDesAction: createActionDto.namDesAction,
      namReportAction: createActionDto.namReportAction,
      datDeadlineAction: createActionDto.datDeadlineAction,
      datStartAction: createActionDto.datStartAction,
      datEndAction: createActionDto.datEndAction,
      numProgressAction: 0,

      lkpIdeMeetAction: createActionDto.lkpIdeMeetAction,
      numParentIdAction: createActionDto.numParentIdAction
    })

    // action.lkpIdeMeetAction.id = createActionDto.lkpIdeMeetAction;
    // action.parent.id = createActionDto.parent;
    // action.lkpIdeMeetAction = createActionDto.lkpIdeMeetAction;
    // action.parent = createActionDto.parent;
    action.childs = [];

    // ذخیره داده های ورودی در دیتابیس
    return await queryRunner.manager.save(ActionEntity,action)
    

    // ذخیره داده های ورودی در دیتابیس
    // return await this.save(action);
  }

  /**
 * this function update one action
 * @param  UpdateActionDto
 * @returns result if job done successfully
 */
  async updateAction(updateActionDto: UpdateActionDto, queryRunner?: QueryRunner) {
    
      let updateObj: any = {
        datModifiedAction: new Date(),
        namModifiedAction: 'mehran',
        flgActiveAction: 1,
        numStatusAction: 1,

        id: updateActionDto.id,
        namDesAction: updateActionDto.namDesAction,
        namReportAction: updateActionDto.namReportAction,
        datDeadlineAction: updateActionDto.datDeadlineAction,
        datStartAction: updateActionDto.datStartAction,
        datEndAction: updateActionDto.datEndAction,
        numProgressAction: updateActionDto.numProgressAction,
      }

      // ذخیره داده های ورودی در دیتابیس
      await queryRunner.manager.update(ActionEntity, updateActionDto.id, updateObj)
      return await this.findSingleAction(updateActionDto.id);
      
      // await this.update(updateActionDto.id, updateObj);
      // return await this.findSingleAction(updateActionDto.id);

      // ذخیره داده های ورودی در دیتابیس
      // return await queryRunner.manager.save(ActionEntity,updateObj)

      // ذخیره داده های ورودی در دیتابیس
      // return await this.save(updateObj);
   

  }

  async updateParentProcess(id, queryRunner?: QueryRunner) {
    const q =
      queryRunner == null
        ? this.createQueryBuilder('act')
        : queryRunner.manager.createQueryBuilder(ActionEntity, 'act')

    const query: any = await q
      .where('act.id = :id', { id })
      // .andWhere('act.flgActiveAction = :isActive', { isActive: 1 })
      // .leftJoinAndSelect('act.childs', 'childs')
      .leftJoinAndSelect('act.parent', 'parent')
      .leftJoinAndSelect('parent.childs', 'childs')
      .getOne();
    // console.log('query:', query);

    if (query.parent) {
      // درصد پیشرفت فقط بر اساس فرزندانی محاسبه میشود که قبلا حذف نشده اند
      let newChilds = query.parent.childs.filter(ch => ch.flgActiveAction != 0);
      if (newChilds.length) {

        let sum = 0;
        let avg = 0;
        for (let i = 0; i < newChilds.length; i++) {
          const element = newChilds[i];
          // console.log('1:',element.id,element.numProgressAction);
          sum += element.numProgressAction;
        }
        avg = sum / newChilds.length;
        // console.log('avg:',avg);
        const result =
          queryRunner == null
            ? await this.update(query.parent.id, { numProgressAction: avg })
            : await queryRunner.manager.update(ActionEntity, query.parent.id, { numProgressAction: avg })

        // await t.update(query.parent.id, { numProgressAction: avg });
      }

      await this.updateParentProcess(query.parent.id);
    }

    // if (!query.parent) {
    //   if (query.childs.legth) {
    //     let sum = 0;
    //     let avg = 0;
    //     for (let i = 0; i < query.childs.length; i++) {
    //       const element = query.childs[i];
    //       sum += element.numProgressAction;
    //     }
    //     avg = sum / query.childs.length;
    //     await this.update(query.id, { numProgressAction: avg });
    //   }
    // } else {
    //   await this.updateParentProcess(query.parent.id, query.parent.numProgressAction);
    // }



  }

  async getAllActionChildsIds(id: number, queryRunner?: QueryRunner, ids: number[] = []) {
    let newIds: number[] = ids;

    const query =
      queryRunner == null
        ? this.createQueryBuilder('act')
        : queryRunner.manager.createQueryBuilder(ActionEntity, 'act')

    const result = await query
      .leftJoinAndSelect('act.childs', 'childs')
      .where('act.id = :id', { id })
      // .andWhere('act.flgActiveAction = :isActive', { isActive: 1 })
      .getOne();

    if (result.childs.length) {
      newIds.push(result.id);
      for (let i = 0; i < result.childs.length; i++) {
        const element = result.childs[i];
        await this.getAllActionChildsIds(element.id, queryRunner, newIds);
      }
    } else {
      newIds.push(result.id);
    }
    return newIds;
  }
}