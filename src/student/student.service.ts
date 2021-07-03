import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// files
import { StudentType } from './student.type';
import { StudentRepository } from './student.repository';
import { CreateStudentInput } from './dto/create-student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(StudentRepository)
    private studentRepository: StudentRepository,
  ) {}

  getStudents(): Promise<StudentType[]> {
    return this.studentRepository.getStudents();
  }

  getStudentById(id: string): Promise<StudentType> {
    return this.studentRepository.getStudentById(id);
  }

  createStudent(createStudentInput: CreateStudentInput): Promise<StudentType> {
    return this.studentRepository.createStudent(createStudentInput);
  }
}
