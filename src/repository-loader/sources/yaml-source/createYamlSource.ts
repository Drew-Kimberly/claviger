import {IRepositoryDefinitionSource} from '../../types';
import {asyncGlob} from './asyncGlob';
import {getRepositoryDefinition} from './getRepositoryDefinition';
import {createLoggerFactory, ILoggerFactory, Logger} from '../../../logger';
import {isDefined, Maybe} from '../../../util';
import {RepositoryDefinition} from '../../../repository-definition';

export const createYamlSource = (
  path: string,
  loggerFactory: ILoggerFactory = createLoggerFactory()
): IRepositoryDefinitionSource => {
  const logger: Logger = loggerFactory.createLogger('yaml-source');
  const pattern = `${path}/**/*.repository.yml`;
  let cachedMatches: string[];

  const getMatches = async (): Promise<string[]> => {
    if (!cachedMatches) {
      cachedMatches = await asyncGlob(pattern);
      logger.debug(
        `Received the following glob matches for pattern ${pattern}`,
        cachedMatches
      );
    }

    return cachedMatches;
  };

  return {
    id: () => 'yaml-source',
    get: async (limit: number, pos: number) => {
      const matches: string[] = await getMatches();
      const definitions: Maybe<RepositoryDefinition>[] = await Promise.all(
        matches
          .slice(pos, pos + limit)
          .map(path => getRepositoryDefinition(path, logger))
      );

      return definitions.filter(isDefined) as RepositoryDefinition[];
    },
  };
};
