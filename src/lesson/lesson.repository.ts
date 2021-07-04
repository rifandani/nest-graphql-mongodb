import { v4 as uuid } from 'uuid';
import { EntityRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
// files
import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonInput } from './dto/create-lesson.input';
import { AssignStudentsToLessonInput } from './dto/assign-students-to-lesson.input';

// typeorm mongodb can't use query & transaction methods
@EntityRepository(LessonEntity)
export class LessonRepository extends Repository<LessonEntity> {
  private readonly logger = new Logger(LessonRepository.name, true);

  async getLessons(): Promise<LessonEntity[]> {
    try {
      // find all lessons
      const lessons = await this.find();
      return lessons;
    } catch (err) {
      this.logger.error(`Failed to get all lessons`, err.stack);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getLessonById(id: string): Promise<LessonEntity> {
    try {
      // find lesson
      const lesson = await this.findOne({ where: { id } });

      // if not found, throws 404
      if (!lesson) {
        this.logger.log(`Lesson with id: ${id} not found`);
        throw new NotFoundException(`Lesson with id: ${id} not found`);
      }

      return lesson;
    } catch (err) {
      this.logger.error(`Failed to get lesson with id: ${id}`, err.stack);
      throw new InternalServerErrorException(err.message);
    }
  }

  async createLesson(
    createLessonInput: CreateLessonInput,
  ): Promise<LessonEntity> {
    const { name, startDate, endDate, students } = createLessonInput;

    // create new lesson
    const lesson = this.create({
      id: uuid(),
      name,
      startDate,
      endDate,
      students,
    });

    try {
      // save new entity to mongodb
      await this.save(lesson);
      return lesson;
    } catch (err) {
      this.logger.error(`Failed to create lesson`, err.stack);
      throw new InternalServerErrorException(err, err.message);
    }
  }

  async assignStudentsToLesson(
    assignStudentsToLesson: AssignStudentsToLessonInput,
  ): Promise<LessonEntity> {
    const { lessonId, studentIds } = assignStudentsToLesson;

    try {
      // insert new studentIds
      // await this.insert({ students: studentIds });

      // get lesson
      const lesson = await this.findOne({ where: { id: lessonId } });

      // if not found, throws 404
      if (!lesson) {
        this.logger.log(`Lesson with id: ${lessonId} not found`);
        throw new NotFoundException(`Lesson with id: ${lessonId} not found`);
      }

      // assign new studentIds
      lesson.students = [...lesson.students, ...studentIds];

      // save to db
      const newLesson = await this.save(lesson);
      return newLesson;
    } catch (err) {
      this.logger.error(`Failed to assignStudentsToLesson`, err.stack);
      throw new InternalServerErrorException(err, err.message);
    }
  }

  async removeLesson(id: string): Promise<boolean> {
    try {
      // using .delete() instead of .remove() to minimize db calls
      const result = await this.delete({ id });

      // if there is no row affected by deletion actions, means not found
      if (result.affected === 0) {
        this.logger.log(`Lesson with id: ${id} not found`);
        throw new NotFoundException(`Lesson with id: ${id} not found`);
      }

      return true;
    } catch (err) {
      this.logger.error(`Failed to removeLesson`, err.stack);
      throw new InternalServerErrorException(err, err.message);
    }
  }
}
