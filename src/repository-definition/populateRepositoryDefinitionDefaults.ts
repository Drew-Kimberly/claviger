import {RepositoryDefinition} from './types';
import {getRepositoryDefinitionDefaults} from './getRepositoryDefinitionDefaults';

export const populateRepositoryDefinitionDefaults = (
  definition: RepositoryDefinition
): RepositoryDefinition => {
  const defaults = getRepositoryDefinitionDefaults();

  return {
    ...defaults,
    ...definition,
    gitRepository: {
      ...defaults.gitRepository,
      ...definition.gitRepository,
    },
    securityAlert: {
      ...defaults.securityAlert,
      ...definition.securityAlert,
    },
    dependencyReport: {
      ...defaults.dependencyReport,
      ...definition.dependencyReport,
    },
  };
};
