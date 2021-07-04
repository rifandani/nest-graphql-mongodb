import {
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
// files
import { StudentEntity } from './entities/student.entity';
import { CreateStudentInput } from './dto/create-student.input';

// typeorm mongodb can't use query & transaction methods
@EntityRepository(StudentEntity)
export class StudentRepository extends Repository<StudentEntity> {
  private readonly logger = new Logger(StudentRepository.name, true);

  async getStudents(): Promise<StudentEntity[]> {
    try {
      // find all students
      const students = await this.find();
      return students;
    } catch (err) {
      this.logger.error(`Failed to getStudents`, err.stack);
      throw new InternalServerErrorException(err.message);
    }
  }

  async getStudentById(id: string): Promise<StudentEntity> {
    try {
      // find student
      const student = await this.findOne({ where: { id } });

      // if not found, throws 404
      if (!student) {
        this.logger.log(`Student with id: ${id} not found`);
        throw new NotFoundException(`Student with id: ${id} not found`);
      }

      return student;
    } catch (err) {
      this.logger.error(`Failed to getStudentById with id: ${id}`, err.stack);
      throw new InternalServerErrorException(err.message);
    }
  }

  async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<StudentEntity> {
    const { firstName, lastName } = createStudentInput;

    // create new student
    const student = this.create({
      id: uuid(),
      firstName,
      lastName,
    });

    try {
      // save new entity to mongodb
      await this.save(student);
      return student;
    } catch (err) {
      this.logger.error(`Failed to createStudent`, err.stack);
      throw new InternalServerErrorException(err.message);
    }
  }

  // methods to populate lesson.students
  async getManyStudents(studentIds: string[]): Promise<StudentEntity[]> {
    try {
      // find all students based on id array, using mongodb specific FindOperator
      const students = await this.find({
        where: {
          id: {
            $in: studentIds,
          },
        },
      });

      return students;
    } catch (err) {
      this.logger.error(`Failed to getManyStudents`, err.stack);
      throw new InternalServerErrorException(err.message);
    }
  }
}
