import {RepositoryDefinition} from '../repository-definition';
import {Observable} from 'rxjs';

export interface IRepositoryDefinitionSource {
  id: () => string;
  get: (limit: number, currentPos: number) => Promise<RepositoryDefinition[]>;
}

export interface ILoadContext {
  limit: number;
}

export type Loader<T> = Observable<T>;

export type LoaderFactory<T> = (
  sources: IRepositoryDefinitionSource[],
  onFailedLoad?: FailedLoadHandler,
  loadContext?: ILoadContext
) => Loader<T>;

export type FailedLoadHandler = (
  source: IRepositoryDefinitionSource,
  e: Error
) => void;
