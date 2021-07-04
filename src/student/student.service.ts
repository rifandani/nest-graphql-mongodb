import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// files
import { StudentRepository } from './student.repository';
import { StudentEntity } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
  ) {}

  getStudents(): Promise<StudentEntity[]> {
    return this.studentRepository.getStudents();
  }

  getStudentById(id: string): Promise<StudentEntity> {
    return this.studentRepository.getStudentById(id);
  }

  createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    return this.studentRepository.createStudent(createStudentInput);
  }

  // methods to populate lesson.students
  getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    return this.studentRepository.getManyStudents(studentIds);
  }
}
