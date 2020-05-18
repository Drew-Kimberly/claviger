import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../../../../../repository-definition';
import {createRepositoryTask} from '../../../../createRepositoryTask';
import {RepositoryTasks} from '../../../../types';
import {createRepository} from '../../../../../repository';
import {isEnabled} from '../../../../tasks/security-alert/filters';

describe('Test suite for isEnabled', () => {
  const mockDefinition: RepositoryDefinition = {
    id: 'foo',
    name: 'Foo Repo',
    packageManager: PackageManagers.NPM,
    emails: ['foo-email@test.com'],
    gitRepository: {
      url: 'foo-repo-url',
      ref: 'foo',
      isMonorepo: true,
    },
    securityAlert: {
      enabled: true,
      minSeverity: SecurityVulnerabilitySeverities.Low,
    },
    dependencyReport: {
      enabled: true,
      includeSecurityOverview: true,
    },
  };

  test("Returns true when the security alert is enabled in the task's repository definition", () => {
    const definition = {...mockDefinition, securityAlert: {enabled: true}};
    const task = createRepositoryTask(
      RepositoryTasks.SecurityAlert,
      createRepository(definition)
    );

    expect(isEnabled(task)).toStrictEqual(true);
  });

  test("Returns false when the security alert is disabled in the task's repository definition", () => {
    const definition = {...mockDefinition, securityAlert: {enabled: false}};
    const task = createRepositoryTask(
      RepositoryTasks.SecurityAlert,
      createRepository(definition)
    );

    expect(isEnabled(task)).toStrictEqual(false);
  });
});
