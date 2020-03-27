import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Patch,
  Query,
  UsePipes,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if (Object.keys(filterDto).length) {
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    return this.tasksService.getAllTasks();
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    const found = this.tasksService.getTaskById(id);
    if (!found) {
      throw new NotFoundException(`task is not found ID: ${id}`);
    }
    return found;
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): void {
    this.tasksService.deleteTaskById(id);
  }
  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status', TaskStatusValidationPipe) status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status);
  }
}
