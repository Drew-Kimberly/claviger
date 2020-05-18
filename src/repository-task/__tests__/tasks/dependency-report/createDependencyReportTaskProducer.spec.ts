import {createLoggerFactory, nullWriter} from '../../../../logger';
import {createDependencyReportTaskProducer} from '../../../tasks/dependency-report';
import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../../../../repository-definition';
import {createRepository} from '../../../../repository';
import {IRepositoryTask, RepositoryTasks} from '../../../types';

describe('Test suite for createDependencyReportTaskProducer', () => {
  const loggerFactory = createLoggerFactory(nullWriter);

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

  test('Returns a callable task producer fn', () => {
    expect(createDependencyReportTaskProducer()).toBeInstanceOf(Function);
  });

  test('Returned fn produces tasks for repositories with enabled dep report', () => {
    const definition = {...mockDefinition, dependencyReport: {enabled: true}};
    const producer = createDependencyReportTaskProducer(loggerFactory);
    const task = producer(createRepository(definition)) as IRepositoryTask;

    expect(task).toBeDefined();
    expect(task.uuid).toContain(RepositoryTasks.DependencyReport);
  });

  test('Returned fn filters out tasks for repositories with disabled dep report', () => {
    const definition = {...mockDefinition, dependencyReport: {enabled: false}};
    const producer = createDependencyReportTaskProducer(loggerFactory);
    const task = producer(createRepository(definition));

    expect(task).toBeUndefined();
  });
});
