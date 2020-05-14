import {IRepository, RepositoryFactory} from './types';
import {
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../repository-definition';

const DEFAULT_BRANCH = 'master';
const CLONE_DEPTH = 1;

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

    gitUrl: () => definition.gitRepository.url,

    gitBranch: () => definition.gitRepository.ref ?? DEFAULT_BRANCH,

    cloneDepth: () => CLONE_DEPTH,

    cloneDestination: () => '',
  };
};
