import {RepositoryDefinition} from '../../../repository-definition';
import {IRepositoryDefinitionSource} from '../../types';

export const createErrorSource = (
  definitions: RepositoryDefinition[],
  errorIndex = 0
): IRepositoryDefinitionSource => {
  return {
    id: () => 'error-source',
    get: async (
      limit: number,
      pos: number
    ): Promise<RepositoryDefinition[]> => {
      if (pos + limit > errorIndex) {
        throw new Error('An error occurred retrieving definitions from source');
      }
      return definitions.slice(pos, pos + limit);
    },
  };
};
