import {RepositoryDefinition} from './types';
import {getRepositoryDefinitionDefaults} from './getRepositoryDefinitionDefaults';
import {loadRepositoryDefinition} from './loadRepositoryDefinition';
import {parseRepositoryId} from './parseRepositoryId';

export const getRepositoryDefinitionByPath = async (
  path: string
): Promise<RepositoryDefinition> => {
  const defaults = getRepositoryDefinitionDefaults();
  const repository = await loadRepositoryDefinition(path);

  return {
    id: parseRepositoryId(path),
    repositoryConfigPath: path,
    ...defaults,
    ...repository,
    gitRepository: {
      ...defaults.gitRepository,
      ...repository.gitRepository,
    },
    securityAlert: {
      ...defaults.securityAlert,
      ...repository.securityAlert,
    },
    dependencyReport: {
      ...defaults.dependencyReport,
      ...repository.dependencyReport,
    },
  };
};
