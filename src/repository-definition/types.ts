export enum PackageManagers {
  NPM = 'npm',
}

export enum SecurityVulnerabilitySeverities {
  Info = 'info',
  Low = 'low',
  Moderate = 'moderate',
  High = 'high',
  Critical = 'critical',
}

// See: /path/to/claviger/schema/repository.schema.json
export interface RepositoryDefinition {
  id: string;
  name: string;
  gitRepository: GitRepo;
  packageManager: PackageManagers;
  emails: string[];
  securityAlert: SecurityAlert;
  dependencyReport: DependencyReport;
}

export interface GitRepo {
  url: string;
  ref?: string;
  isMonorepo?: boolean;
}

export interface SecurityAlert {
  enabled: boolean;
  minSeverity?: SecurityVulnerabilitySeverities;
}

export interface DependencyReport {
  enabled: boolean;
  includeSecurityOverview?: boolean;
}
