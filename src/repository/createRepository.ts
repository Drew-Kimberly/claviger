import {IRepository, RepositoryFactory} from './types';
import {
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../repository-definition';

const DEFAULT_BRANCH = 'master';
const DEFAULT_MIN_SEVERITY = SecurityVulnerabilitySeverities.High;

export const createRepository: RepositoryFactory = (
  definition: RepositoryDefinition
): IRepository => {
  return {
    getDefinition: () => definition,

    id: () => definition.id,

    name: () => definition.name,

    getPackageManager: () => definition.packageManager,

    getEmails: () => definition.emails,

    getGitRepoUrl: () => definition.gitRepository.url,

    getGitRepoRef: () => definition.gitRepository.ref ?? DEFAULT_BRANCH,

    isMonorepo: () => Boolean(definition.gitRepository.isMonorepo),

    isSecurityAlertEnabled: () => definition.securityAlert.enabled,

    securityAlertMinSeverity: () =>
      definition.securityAlert.minSeverity ?? DEFAULT_MIN_SEVERITY,

    isDependencyReportEnabled: () => definition.dependencyReport.enabled,

    includeSecurityOverviewInDependencyReport: () =>
      Boolean(definition.dependencyReport.includeSecurityOverview),
  };
};
