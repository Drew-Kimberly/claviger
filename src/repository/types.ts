import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../repository-definition';
import {ICloneable} from '../git';

export interface IRepository extends ICloneable {
  getDefinition(): RepositoryDefinition;
  id(): string;
  name(): string;
  getPackageManager(): PackageManagers;
  getEmails(): string[];
  isMonorepo(): boolean;
  isSecurityAlertEnabled(): boolean;
  securityAlertMinSeverity(): SecurityVulnerabilitySeverities;
  isDependencyReportEnabled(): boolean;
  includeSecurityOverviewInDependencyReport(): boolean;
}

export type RepositoryFactory = (
  definition: RepositoryDefinition
) => IRepository;
