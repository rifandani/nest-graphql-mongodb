import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
// files
import { StudentType } from './student.type';
import { StudentService } from './student.service';
import { CreateStudentInput } from './dto/create-student.input';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => [StudentType])
  getStudents(): Promise<StudentType[]> {
    return this.studentService.getStudents();
  }

  @Query(() => StudentType)
  getStudentById(@Args('id') id: string): Promise<StudentType> {
    return this.studentService.getStudentById(id);
  }

  @Mutation(() => StudentType)
  createStudent(
    @Args('createStudent') createStudentInput: CreateStudentInput,
  ): Promise<StudentType> {
    return this.studentService.createStudent(createStudentInput);
  }
}
