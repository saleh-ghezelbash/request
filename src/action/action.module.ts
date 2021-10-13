import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActionController } from './action.controller';
import { ActionRepository } from './action.repository';
import { ActionService } from './action.service';

@Module({
  imports:[TypeOrmModule.forFeature([ActionRepository])],
  controllers: [ActionController],
  providers: [ActionService]
})
export class ActionModule {}
