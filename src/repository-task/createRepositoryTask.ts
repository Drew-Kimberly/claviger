import {IRepository} from '../repository';
import {IRepositoryTask, RepositoryTasks} from './types';
import {uuid} from 'uuidv4';

export const createRepositoryTask = (
  type: RepositoryTasks,
  repository: IRepository
): IRepositoryTask => ({
  uuid: `${repository.id()}--${type}--${uuid()}`,
  type: type,
  created: Math.floor(Date.now() / 1000),
  definition: repository.getDefinition(),
});
