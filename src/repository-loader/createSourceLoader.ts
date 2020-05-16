import {
  FailedLoadHandler,
  ILoadContext,
  IRepositoryDefinitionSource,
  Loader,
} from './types';
import {RepositoryDefinition} from '../repository-definition';
import {BehaviorSubject, from} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {defaultFailedLoadHandler} from './defaultFailedLoadHandler';
import {defaultLoadContext} from './defaultLoadContext';

export const createSourceLoader = (
  source: IRepositoryDefinitionSource,
  onFailedLoad: FailedLoadHandler = defaultFailedLoadHandler,
  loadContext: ILoadContext = defaultLoadContext
): Loader<RepositoryDefinition> => {
  let pos = 0;
  const loadController = new BehaviorSubject(pos);

  return loadController.pipe(
    mergeMap(async currentPos => {
      try {
        return await source.get(loadContext.limit, currentPos);
      } catch (e) {
        onFailedLoad && onFailedLoad(source, e);
        return [];
      }
    }),
    mergeMap(definitions => {
      if (definitions.length === 0) loadController.complete();

      pos += loadContext.limit;
      loadController.next(pos);
      return from(definitions);
    })
  );
};
