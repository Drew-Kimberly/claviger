import {RepositoryDefinition} from '../../../repository-definition';
import {IRepositoryDefinitionSource} from '../../types';

export const createDelayedMemorySource = (
  definitions: RepositoryDefinition[],
  delay = 1000
): IRepositoryDefinitionSource => {
  return {
    id: () => 'delayed-memory-source',
    get: (limit: number, pos: number): Promise<RepositoryDefinition[]> => {
      return new Promise(resolve => {
        setTimeout(() => resolve(definitions.slice(pos, pos + limit)), delay);
      });
    },
  };
};
