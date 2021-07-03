import { v4 as uuid } from 'uuid';
import { EntityRepository, Repository } from 'typeorm';
import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
// files
import { LessonEntity } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

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
    const { name, startDate, endDate } = createLessonInput;

    // create new lesson
    const lesson = this.create({
      id: uuid(),
      name,
      startDate,
      endDate,
    });

    try {
      // save new entity to mongodb
      await this.save(lesson);
      return lesson;
    } catch (err) {
      this.logger.error(`Failed to create lesson`, err.stack);
      throw new InternalServerErrorException(err.message);
    }
  }
}
