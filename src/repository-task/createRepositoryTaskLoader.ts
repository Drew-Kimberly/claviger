import {Loader} from '../repository-loader';
import {IRepository} from '../repository';
import {IRepositoryTask, RepositoryTaskProducer} from './types';
import {filter, map} from 'rxjs/operators';
import {isDefined} from '../util';

export const createRepositoryTaskLoader = (
  taskProducer: RepositoryTaskProducer,
  repositoryLoader: Loader<IRepository>
): Loader<IRepositoryTask> => {
  return repositoryLoader.pipe(map(taskProducer), filter(isDefined));
};
