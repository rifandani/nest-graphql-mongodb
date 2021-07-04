import { Logger } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
// files
import { LessonType } from './lesson.type';
import { LessonService } from './lesson.service';
import { LessonEntity } from './entities/lesson.entity';
import { CreateLessonInput } from './dto/create-lesson.input';
import { AssignStudentsToLessonInput } from './dto/assign-students-to-lesson.input';
import { StudentType } from 'src/student/student.type';
import { StudentService } from 'src/student/student.service';

@Resolver(() => LessonType)
export class LessonResolver {
  constructor(
    private lessonService: LessonService,
    private studentService: StudentService,
  ) {}

  private readonly logger = new Logger(LessonResolver.name, true); // use logger

  @Query(() => [LessonType], { name: 'lessons' })
  getLessons(): Promise<LessonEntity[]> {
    this.logger.verbose(`getLessons`);

    return this.lessonService.getLessons();
  }

  @Query(() => LessonType, { name: 'lesson' })
  getLessonById(@Args('id') id: string): Promise<LessonEntity> {
    this.logger.verbose(`getLessonById`);

    return this.lessonService.getLessonById(id);
  }

  @Mutation(() => LessonType)
  createLesson(
    @Args('createLessonInput') createLessonInput: CreateLessonInput,
  ): Promise<LessonEntity> {
    this.logger.verbose(`createLesson`);

    return this.lessonService.createLesson(createLessonInput);
  }

  @Mutation(() => Boolean)
  removeLesson(@Args('id') id: string): Promise<boolean> {
    this.logger.verbose(`removeLesson`);

    return this.lessonService.removeLesson(id);
  }

  @Mutation(() => LessonType)
  assignStudentsToLesson(
    @Args('assignStudentsToLesson')
    assignStudentsToLesson: AssignStudentsToLessonInput,
  ): Promise<LessonEntity> {
    this.logger.verbose(`assignStudentsToLesson`);

    return this.lessonService.assignStudentsToLesson(assignStudentsToLesson);
  }

  // populate students field
  @ResolveField('students', () => [StudentType])
  async students(@Parent() lesson: LessonEntity) {
    return this.studentService.getManyStudents(lesson.students);
  }
}
