import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// files
import { LessonResolver } from './lesson.resolver';
import { LessonService } from './lesson.service';
import { LessonRepository } from './lesson.repository';

@Module({
  imports: [TypeOrmModule.forFeature([LessonRepository])],
  providers: [LessonResolver, LessonService],
})
export class LessonModule {}
