import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
// files
import { LessonModule } from './lesson/lesson.module';
import { LessonEntity } from './lesson/lesson.entity';
import { StudentModule } from './student/student.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // url: 'mongodb://rizeki:rifandani@localhost:27017/school-management',
      // username: 'rizeki',
      // password: 'rifandani',
      // host: 'localhost',
      // database: 'school-management',
      type: 'mongodb',
      url: 'mongodb://localhost/school-management',
      useUnifiedTopology: true,
      useNewUrlParser: true,
      synchronize: true,
      entities: [LessonEntity],
      // autoLoadEntities: true,
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    LessonModule,
    StudentModule,
  ],
})
export class AppModule {}
