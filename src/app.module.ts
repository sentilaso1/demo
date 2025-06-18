import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SkillsModule } from './skills/skills.module';
import { UsersModule } from './users/users.module';
import { GoalsModule } from './goals/goals.module';
import { GoalSkillsModule } from './goal-skills/goal-skills.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'test',
      synchronize: true,
      autoLoadEntities: true,
    }),
    SkillsModule,
    UsersModule,
    GoalsModule,
    GoalSkillsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
