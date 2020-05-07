import {
  DependencyReport,
  GitRepo,
  RepositoryDefinition,
  SecurityAlert,
  SecurityVulnerabilitySeverities,
} from './types';

export const getRepositoryDefinitionDefaults = (): Partial<
  RepositoryDefinition
> => ({
  gitRepository:
    {
      ref: 'master',
      isMonorepo: false,
    } as GitRepo,
  securityAlert:
    {
      minSeverity: SecurityVulnerabilitySeverities.High,
    } as SecurityAlert,
  dependencyReport:
    {
      includeSecurityOverview: true,
    } as DependencyReport,
});
