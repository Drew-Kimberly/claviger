import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../../repository-definition';
import {createRepository, IRepository} from '../../repository';
import {RepositoryTasks} from '../types';
import {createRepositoryTask} from '../createRepositoryTask';

describe('Test suite for createRepositoryTask', () => {
  const mockTimestamp = 1577840400000;
  const DateDotNow = Date.now;

  beforeEach(() => (Date.now = () => 1577840400000));
  afterEach(() => (Date.now = DateDotNow));

  const definition: RepositoryDefinition = {
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
  const repository: IRepository = createRepository(definition);

  test("The task's UUID contains the repository ID and task type", () => {
    const type = RepositoryTasks.DependencyReport;
    const task = createRepositoryTask(type, repository);

    expect(task.uuid).toContain(repository.id());
    expect(task.uuid).toContain(type);
  });

  test('The task includes a created timestamp in seconds', () => {
    const task = createRepositoryTask(
      RepositoryTasks.DependencyReport,
      repository
    );

    expect(task.created).toEqual(mockTimestamp / 1000);
  });

  test('The task includes the repository definition', () => {
    const task = createRepositoryTask(
      RepositoryTasks.DependencyReport,
      repository
    );

    expect(task.definition).toEqual(definition);
  });
});
