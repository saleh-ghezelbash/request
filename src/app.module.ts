import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { mysqlConfig } from './config/database.config';
import { RequestModule } from './request/request.module';
import { MeetingModule } from './meeting/meeting.module';
import { ActionModule } from './action/action.module';


@Module({
  imports: [TypeOrmModule.forRoot(mysqlConfig), RequestModule, MeetingModule, ActionModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
