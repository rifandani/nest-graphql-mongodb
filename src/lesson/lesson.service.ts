import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
// files
import { LessonEntity } from './lesson.entity';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonEntity)
    private lessonEntity: Repository<LessonEntity>,
  ) {}

  async createLesson(
    name: string,
    startDate: string,
    endDate: string,
  ): Promise<LessonEntity> {
    const lesson = this.lessonEntity.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    return this.lessonEntity.save(lesson);
    ;
  }
}
