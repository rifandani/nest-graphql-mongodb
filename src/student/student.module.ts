import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// files
import { StudentResolver } from './student.resolver';
import { StudentService } from './student.service';
import { StudentEntity } from './entities/student.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StudentEntity])],
  providers: [StudentResolver, StudentService],
})
export class StudentModule {}
