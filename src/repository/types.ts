import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../repository-definition';

export interface IRepository {
  getDefinition(): RepositoryDefinition;
  id(): string;
  name(): string;
  getPackageManager(): PackageManagers;
  getEmails(): string[];
  getGitRepoUrl(): string;
  getGitRepoRef(): string;
  isMonorepo(): boolean;
  isSecurityAlertEnabled(): boolean;
  securityAlertMinSeverity(): SecurityVulnerabilitySeverities;
  isDependencyReportEnabled(): boolean;
  includeSecurityOverviewInDependencyReport(): boolean;
}

export type RepositoryFactory = (
  definition: RepositoryDefinition
) => IRepository;
