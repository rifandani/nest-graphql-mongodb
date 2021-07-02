import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// files
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonEntity } from './lesson.entity';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(private lessonService: LessonService) {}

  @Query(() => LessonType)
  lesson(): LessonType {
    return {
      id: '1',
      name: 'Math class',
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
    };
  }

  @Mutation(() => LessonType)
  async createLesson(
    @Args('name') name: string,
    @Args('startDate') startDate: string,
    @Args('endDate') endDate: string,
  ): Promise<LessonEntity> {
    return this.lessonService.createLesson(name, startDate, endDate);
  }
}
