import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { Task, TaskStatus } from './task.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
    // If we have any filters defined, call taskService.getTasksWilFilters
    // otherwise, just get all tasks
    if (Object.keys(filterDto).length){
      return this.tasksService.getTasksWithFilters(filterDto);
    }
    else{
      return this.tasksService.getAllTasks();
    }
    
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): Task {
    return this.tasksService.getTaskById(id);
  }

  @Post()
  creteTask(
    @Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Delete('/:id')
  deleteTask(
    @Param('id') id: string): void {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskStatus(id, status)
  }

  @Patch('/:id/description')
  updateTaskDescription(
    @Param('id') id: string,
    @Body('description') description: string,
  ): Task {
    return this.tasksService.updateTaskDescription(id, description)

  }
}
