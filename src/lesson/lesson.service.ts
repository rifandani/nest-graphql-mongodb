import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// files
import { LessonRepository } from './lesson.repository';
import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonInput } from './dto/create-lesson.input';
import { AssignStudentsToLessonInput } from './dto/assign-students-to-lesson.input';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(LessonRepository)
    private lessonRepository: LessonRepository,
  ) {}

  getLessons(): Promise<LessonEntity[]> {
    return this.lessonRepository.getLessons();
  }

  getLessonById(id: string): Promise<LessonEntity> {
    return this.lessonRepository.getLessonById(id);
  }

  createLesson(createLessonInput: CreateLessonInput): Promise<LessonEntity> {
    return this.lessonRepository.createLesson(createLessonInput);
  }

  assignStudentsToLesson(
    assignStudentsToLesson: AssignStudentsToLessonInput,
  ): Promise<LessonEntity> {
    return this.lessonRepository.assignStudentsToLesson(assignStudentsToLesson);
  }

  removeLesson(id: string): Promise<boolean> {
    return this.lessonRepository.removeLesson(id);
  }
}
