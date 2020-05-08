import {RepositoryDefinition} from './types';
import {getRepositoryDefinitionDefaults} from './getRepositoryDefinitionDefaults';
import {loadRepositoryDefinition} from './loadRepositoryDefinition';
import {parseRepositoryId} from './parseRepositoryId';
import {Maybe} from '../util';

export const getRepositoryDefinitionByPath = async (
  path: string
): Promise<Maybe<RepositoryDefinition>> => {
  const defaults = getRepositoryDefinitionDefaults();
  const repository = await loadRepositoryDefinition(path);

  if (!repository) return undefined;

  return {
    id: parseRepositoryId(path),
    repositoryDefinitionPath: path,
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
