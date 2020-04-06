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

// See: /path/to/upkeep/schema/repository.schema.json
export interface UpkeepRepository {
  id: string;
  name: string;
  gitRepository: UpkeepGitRepo;
  packageManager: PackageManagers;
  emails: string[];
  securityAlert: UpkeepSecurityAlert;
  dependencyReport: UpkeepDependencyReport;
  repositoryConfigPath: string;
}

export interface UpkeepGitRepo {
  url: string;
  ref?: string;
  isLernaMonorepo?: boolean;
}

export interface UpkeepSecurityAlert {
  enabled: boolean;
  minSeverity?: SecurityVulnerabilitySeverities;
}

export interface UpkeepDependencyReport {
  enabled: boolean;
  includeSecurityOverview?: boolean;
}
