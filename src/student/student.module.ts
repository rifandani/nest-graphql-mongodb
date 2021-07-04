import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// files
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import { StudentRepository } from './student.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StudentRepository])],
  providers: [StudentResolver, StudentService],
  exports: [StudentService],
})
export class StudentModule {}
