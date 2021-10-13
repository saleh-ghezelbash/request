import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RequestController } from './request.controller';
import { RequestRepository } from './request.repository';
import { RequestService } from './request.service';

@Module({
  imports:[TypeOrmModule.forFeature([RequestRepository])],
  controllers: [RequestController],
  providers: [RequestService]
})
export class RequestModule {}
