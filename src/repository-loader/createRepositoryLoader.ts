import {
  FailedLoadHandler,
  ILoadContext,
  IRepositoryDefinitionSource,
  Loader,
  LoaderFactory,
} from './types';
import {map} from 'rxjs/operators';
import {createRepositoryDefinitionLoader} from './createRepositoryDefinitionLoader';
import {createRepository, IRepository} from '../repository';
import {defaultFailedLoadHandler} from './defaultFailedLoadHandler';
import {defaultLoadContext} from './defaultLoadContext';

export const createRepositoryLoader: LoaderFactory<IRepository> = (
  sources: IRepositoryDefinitionSource[],
  onFailedLoad: FailedLoadHandler = defaultFailedLoadHandler,
  loadContext: ILoadContext = defaultLoadContext
): Loader<IRepository> =>
  createRepositoryDefinitionLoader(sources, onFailedLoad, loadContext).pipe(
    map(createRepository)
  );
