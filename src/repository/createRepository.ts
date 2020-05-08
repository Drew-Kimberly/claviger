import {IRepository, RepositoryFactory} from './types';
import {
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../repository-definition';

export const createRepository: RepositoryFactory = (
  definition: RepositoryDefinition
): IRepository => {
  return {
    getDefinition: () => definition,

    id: () => definition.id,

    name: () => definition.name,

    getPackageManager: () => definition.packageManager,

    getEmails: () => definition.emails,

    isMonorepo: () => Boolean(definition.gitRepository.isMonorepo),

    isSecurityAlertEnabled: () => definition.securityAlert.enabled,

    securityAlertMinSeverity: () =>
      definition.securityAlert.minSeverity ??
      SecurityVulnerabilitySeverities.High,

    isDependencyReportEnabled: () => definition.dependencyReport.enabled,

    includeSecurityOverviewInDependencyReport: () =>
      Boolean(definition.dependencyReport.includeSecurityOverview),

    cloneCmd: (destination: string) =>
      `git clone --depth=1 ${definition.gitRepository.url} ${destination} -b ${definition.gitRepository.ref}`,

    path: () => definition.repositoryDefinitionPath,
  };
};
