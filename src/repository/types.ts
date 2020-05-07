import {PackageManagers, RepositoryDefinition, SecurityVulnerabilitySeverities} from '../repository-definition';

export interface IRepository extends ICloneable, IDirectory {
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

export interface ICloneable {
  cloneCmd(destination: string): string;
}

export interface IDirectory {
  path(): string;
}

export type RepositoryFactory = Factory<RepositoryDefinition, IRepository>;
export type GitCloneExecutor = (cloneable: ICloneable) => Promise<IDirectory>;
export type ChangeDirectoryExecutor = (
  directory: IDirectory
) => Promise<IDirectory>;
export type Factory<T, V> = (input: T) => V;
