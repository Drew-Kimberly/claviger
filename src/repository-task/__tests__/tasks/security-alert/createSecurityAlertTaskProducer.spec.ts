import {createLoggerFactory, nullWriter} from '../../../../logger';
import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../../../../repository-definition';
import {createRepository} from '../../../../repository';
import {IRepositoryTask, RepositoryTasks} from '../../../types';
import {createSecurityAlertTaskProducer} from '../../../tasks/security-alert';

describe('Test suite for createSecurityAlertTaskProducer', () => {
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
    expect(createSecurityAlertTaskProducer()).toBeInstanceOf(Function);
  });

  test('Returned fn produces tasks for repositories with enabled security alert', () => {
    const definition = {...mockDefinition, securityAlert: {enabled: true}};
    const producer = createSecurityAlertTaskProducer(loggerFactory);
    const task = producer(createRepository(definition)) as IRepositoryTask;

    expect(task).toBeDefined();
    expect(task.uuid).toContain(RepositoryTasks.SecurityAlert);
  });

  test('Returned fn filters out tasks for repositories with disabled security alert', () => {
    const definition = {...mockDefinition, securityAlert: {enabled: false}};
    const producer = createSecurityAlertTaskProducer(loggerFactory);
    const task = producer(createRepository(definition));

    expect(task).toBeUndefined();
  });
});
