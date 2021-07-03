import { Logger } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// files
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonEntity } from './lesson.entity';
import { CreateLessonInput } from './lesson.input';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  private readonly logger = new Logger(LessonResolver.name, true); // use logger

  @Query(() => [LessonType])
  getLessons(): Promise<LessonEntity[]> {
    this.logger.verbose(`getLessons`);

    return this.lessonService.getLessons();
  }

  @Query(() => LessonType)
  getLessonById(@Args('id') id: string): Promise<LessonEntity> {
    this.logger.verbose(`getLessonById`);

    return this.lessonService.getLessonById(id);
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<LessonEntity> {
    this.logger.verbose(`getLessonById`);

    return this.lessonService.createLesson(createLessonInput);
  }
}
