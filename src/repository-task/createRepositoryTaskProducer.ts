import {
  IRepositoryTask,
  RepositoryTaskFilter,
  RepositoryTaskProducer,
  RepositoryTasks,
} from './types';
import {createLoggerFactory, ILoggerFactory, Logger} from '../logger';
import {createRepositoryTask} from './createRepositoryTask';

const applyFilters = (
  task: IRepositoryTask,
  filters: RepositoryTaskFilter[],
  logger: Logger
): boolean => {
  for (const filter of filters) {
    if (!filter(task)) {
      logger.debug(`Filtered task ${task.uuid}`, task);
      return false;
    }
  }

  return true;
};

const taskWithBreadcrumbLogging = (
  task: IRepositoryTask,
  logger: Logger
): IRepositoryTask => {
  logger.info(`Created task ${task.uuid}`);
  logger.debug(`Task ${task.uuid}:`, task);
  return task;
};

export const createRepositoryTaskProducer = (
  type: RepositoryTasks,
  filters: RepositoryTaskFilter[],
  loggerFactory: ILoggerFactory = createLoggerFactory()
): RepositoryTaskProducer => {
  const logger = loggerFactory.createLogger('repository-task');

  return repository => {
    const task = createRepositoryTask(type, repository);
    return applyFilters(task, filters, logger)
      ? taskWithBreadcrumbLogging(task, logger)
      : undefined;
  };
};
