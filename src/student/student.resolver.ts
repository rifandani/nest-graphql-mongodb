import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Logger } from '@nestjs/common';
// files
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './dto/create-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  private readonly logger = new Logger(StudentResolver.name, true); // use logger

  @Query(() => [StudentType], { name: 'students' })
  getStudents(): Promise<StudentType[]> {
    this.logger.verbose(`getStudents`);

    return this.studentService.getStudents();
  }

  @Query(() => StudentType, { name: 'student' })
  getStudent(@Args('id') id: string): Promise<StudentType> {
    this.logger.verbose(`getStudent`);

    return this.studentService.getStudentById(id);
  }

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudent') createStudentInput: CreateStudentInput,
  ): Promise<StudentType> {
    this.logger.verbose(`createStudent`);

    return this.studentService.createStudent(createStudentInput);
  }
}
