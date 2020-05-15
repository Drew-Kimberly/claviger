import {IRepositoryDefinitionSource} from '../types';
import {asyncGlob} from './asyncGlob';
import {getRepositoryDefinition} from './getRepositoryDefinition';

export const createYamlSource = (path: string): IRepositoryDefinitionSource => {
  const pattern = `${path}/**/*.repository.yml`;
  let cachedMatches: string[];

  const getMatches = async (): Promise<string[]> => {
    if (!cachedMatches) {
      cachedMatches = (await asyncGlob(pattern)) ?? [];
    }

    return cachedMatches;
  };

  return {
    id: () => 'yaml-source',
    get: async (limit: number, pos: number) => {
      const matches = await getMatches();
      return await Promise.all(
        matches.slice(pos, pos + limit).map(getRepositoryDefinition)
      );
    },
  };
};
