import {createLoggerFactory, ILoggerFactory} from '../../../logger';
import {RepositoryTaskProducer, RepositoryTasks} from '../../types';
import {createRepositoryTaskProducer} from '../../createRepositoryTaskProducer';
import {isEnabled} from './filters';

export const createDependencyReportTaskProducer = (
  loggerFactory: ILoggerFactory = createLoggerFactory()
): RepositoryTaskProducer =>
  createRepositoryTaskProducer(
    RepositoryTasks.DependencyReport,
    [isEnabled],
    loggerFactory
  );
