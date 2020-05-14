import {RepositoryDefinition} from '../../repository-definition';
import {IRepositoryDefinitionSource} from '../types';

export const createMemorySource = (
  definitions: RepositoryDefinition[]
): IRepositoryDefinitionSource => {
  return {
    id: () => 'memory-source',
    get: async (limit: number, pos: number): Promise<RepositoryDefinition[]> =>
      definitions.slice(pos, pos + limit),
  };
};
