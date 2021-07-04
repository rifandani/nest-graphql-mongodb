import { Field, ID, ObjectType } from '@nestjs/graphql';
// files
import { StudentType } from 'src/student/student.type';

@ObjectType('Lesson')
export class LessonType {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  startDate: string; // as ISO string

  @Field()
  endDate: string; // as ISO string

  @Field(() => [StudentType])
  students: string[];
}

// typeorm entity and graphql type in the same file
// import { ObjectType, Field, ID } from '@nestjs/graphql';
// import { Entity, PrimaryColumn, Column, ObjectIdColumn } from 'typeorm';

// @ObjectType('Lesson')
// @Entity({ name: 'Lesson' })
// export class LessonType {
//   @ObjectIdColumn()
//   _id: string;

//   @Field(() => ID)
//   @PrimaryColumn()
//   id: string;

//   @Field()
//   @Column()
//   name: string;

//   @Field()
//   @Column()
//   startDate: string;

//   @Field()
//   @Column()
//   endDate: string;
// }
