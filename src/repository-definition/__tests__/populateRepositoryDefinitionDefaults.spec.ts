import {getRepositoryDefinitionDefaults} from '../getRepositoryDefinitionDefaults';
import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../types';
import {populateRepositoryDefinitionDefaults} from '../populateRepositoryDefinitionDefaults';

describe('Test suite for populateRepositoryDefinitionDefaults', () => {
  const defaults = getRepositoryDefinitionDefaults();

  test('Repository definition defaults are populated on the returned instance', () => {
    const definition: RepositoryDefinition = {
      id: 'foo',
      name: 'Foo Repo',
      packageManager: PackageManagers.NPM,
      emails: ['foo-email@test.com'],
      gitRepository: {
        url: 'foo-repo-url',
      },
      securityAlert: {
        enabled: false,
      },
      dependencyReport: {
        enabled: true,
      },
    };

    const expected: RepositoryDefinition = {
      id: definition.id,
      name: definition.name,
      packageManager: definition.packageManager,
      emails: definition.emails,
      gitRepository: {
        url: definition.gitRepository.url,
        ref: defaults.gitRepository?.ref,
        isMonorepo: defaults.gitRepository?.isMonorepo,
      },
      securityAlert: {
        enabled: definition.securityAlert.enabled,
        minSeverity: defaults.securityAlert?.minSeverity,
      },
      dependencyReport: {
        enabled: definition.dependencyReport.enabled,
        includeSecurityOverview:
          defaults.dependencyReport?.includeSecurityOverview,
      },
    };

    expect(populateRepositoryDefinitionDefaults(definition)).toEqual(expected);
  });

  test('The provided definition overrides all default values', () => {
    const definition: RepositoryDefinition = {
      id: 'foo',
      name: 'Foo Repo',
      packageManager: PackageManagers.NPM,
      emails: ['foo-email@test.com'],
      gitRepository: {
        url: 'foo-repo-url',
        ref: 'foo',
        isMonorepo: !defaults.gitRepository?.isMonorepo,
      },
      securityAlert: {
        enabled: false,
        minSeverity: SecurityVulnerabilitySeverities.Low,
      },
      dependencyReport: {
        enabled: true,
        includeSecurityOverview: !defaults.dependencyReport
          ?.includeSecurityOverview,
      },
    };

    const expected: RepositoryDefinition = {
      id: definition.id,
      name: definition.name,
      packageManager: definition.packageManager,
      emails: definition.emails,
      gitRepository: {
        url: definition.gitRepository.url,
        ref: definition.gitRepository.ref,
        isMonorepo: definition.gitRepository.isMonorepo,
      },
      securityAlert: {
        enabled: definition.securityAlert.enabled,
        minSeverity: definition.securityAlert.minSeverity,
      },
      dependencyReport: {
        enabled: definition.dependencyReport.enabled,
        includeSecurityOverview:
          definition.dependencyReport.includeSecurityOverview,
      },
    };

    expect(populateRepositoryDefinitionDefaults(definition)).toEqual(expected);
  });
});
