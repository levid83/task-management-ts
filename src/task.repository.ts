import { Repository, EntityRepository } from 'typeorm';
import { Task } from './tasks/task.entity';
import { CreateTaskDto } from './tasks/dto/create-task.dto';
import { TaskStatus } from './tasks/task-status.enum';
import { InternalServerErrorException } from '@nestjs/common';
import { GetTasksFilterDto } from './tasks/dto/get-tasks-filter.dto';

@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {
  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    const { search, status } = filterDto;
    const query = this.createQueryBuilder('task');

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

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = new Task();
    task.title = title;
    task.description = description;
    task.status = TaskStatus.OPEN;
    try {
      await task.save();
    } catch (err) {
      throw new InternalServerErrorException();
    }
    return task;
  }
}
