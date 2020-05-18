import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../../../../../repository-definition';
import {createRepositoryTask} from '../../../../createRepositoryTask';
import {RepositoryTasks} from '../../../../types';
import {createRepository} from '../../../../../repository';
import {isEnabled} from '../../../../tasks/dependency-report/filters';

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

  test("Returns true when the dependency report is enabled in the task's repository definition", () => {
    const definition = {...mockDefinition, dependencyReport: {enabled: true}};
    const task = createRepositoryTask(
      RepositoryTasks.DependencyReport,
      createRepository(definition)
    );

    expect(isEnabled(task)).toStrictEqual(true);
  });

  test("Returns false when the dependency report is disabled in the task's repository definition", () => {
    const definition = {...mockDefinition, dependencyReport: {enabled: false}};
    const task = createRepositoryTask(
      RepositoryTasks.DependencyReport,
      createRepository(definition)
    );

    expect(isEnabled(task)).toStrictEqual(false);
  });
});
