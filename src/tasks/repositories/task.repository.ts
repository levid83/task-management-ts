import { Repository, EntityRepository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { CreateTaskDto } from '../dtos/create-task.dto';
import { TaskStatus } from '../enums/task-status.enum';
import { InternalServerErrorException } from '@nestjs/common';
import { GetTasksFilterDto } from '../dtos/get-tasks-filter.dto';
import { User } from 'src/auth/entities/user.entity';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task').where(
      'task.userId = :userId',
      {
        userId: user.id,
      },
    );

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(task.title LIKE :search OR task.description LIKE :search)',
        { search: `%${search}%` },
      );
    }
    try {
      const tasks = await query.getMany();
      return tasks;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    task.user = user;
    try {
      await task.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
    delete task.user;

    return task;
  }
}
