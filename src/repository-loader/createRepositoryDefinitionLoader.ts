import {
  FailedLoadHandler,
  ILoadContext,
  IRepositoryDefinitionSource,
  Loader,
  LoaderFactory,
} from './types';
import {
  populateRepositoryDefinitionDefaults,
  RepositoryDefinition,
} from '../repository-definition';
import {createSourceLoader} from './createSourceLoader';
import {merge} from 'rxjs';
import {map} from 'rxjs/operators';
import {defaultFailedLoadHandler} from './defaultFailedLoadHandler';
import {defaultLoadContext} from './defaultLoadContext';

export const createRepositoryDefinitionLoader: LoaderFactory<RepositoryDefinition> = (
  sources: IRepositoryDefinitionSource[],
  onFailedLoad: FailedLoadHandler = defaultFailedLoadHandler,
  loadContext: ILoadContext = defaultLoadContext
): Loader<RepositoryDefinition> => {
  const loaders: Loader<RepositoryDefinition>[] = sources.map(source =>
    createSourceLoader(source, onFailedLoad, loadContext)
  );

  return merge(...loaders).pipe(map(populateRepositoryDefinitionDefaults));
};
