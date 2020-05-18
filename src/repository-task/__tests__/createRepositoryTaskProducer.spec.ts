import {createRepositoryTaskProducer} from '../createRepositoryTaskProducer';
import {RepositoryTaskFilter, RepositoryTasks} from '../types';
import {createLoggerFactory, Logger, nullWriter} from '../../logger';
import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../../repository-definition';
import {createRepository, IRepository} from '../../repository';
import {createLogger} from '../../logger/createLogger';
import {EventEmitter} from 'events';

describe('Test suite for createRepositoryTaskProducer', () => {
  const loggerFactory = createLoggerFactory(nullWriter);
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

  beforeEach(() => jest.clearAllMocks());

  test('Given a task type, returns a callable function', () => {
    expect(
      createRepositoryTaskProducer(RepositoryTasks.DependencyReport, [])
    ).toBeInstanceOf(Function);
  });

  test('The returned callable returns a task when provided a repository instance', () => {
    const producer = createRepositoryTaskProducer(
      RepositoryTasks.DependencyReport,
      [],
      loggerFactory
    );
    expect(producer(repository)).toBeDefined();
  });

  test('A task is returned when it meets the provided filter condition', () => {
    const filters: RepositoryTaskFilter[] = [task => true];
    const producer = createRepositoryTaskProducer(
      RepositoryTasks.DependencyReport,
      filters,
      loggerFactory
    );

    expect(producer(repository)).toBeDefined();
  });

  test('Given multiple task filters, a task can still be returned granted it meets all criteria', () => {
    const filters: RepositoryTaskFilter[] = [
      task => true,
      task => true,
      task => true,
    ];
    const producer = createRepositoryTaskProducer(
      RepositoryTasks.DependencyReport,
      filters,
      loggerFactory
    );

    expect(producer(repository)).toBeDefined();
  });

  test('The callables returns undefined when it does not meet the provided filter condition', () => {
    const filters: RepositoryTaskFilter[] = [task => false];
    const producer = createRepositoryTaskProducer(
      RepositoryTasks.DependencyReport,
      filters,
      loggerFactory
    );

    expect(producer(repository)).toBeUndefined();
  });

  test('Given multiple task filters, undefined is returned if it does not meet just 1 criteria', () => {
    const filters: RepositoryTaskFilter[] = [
      task => true,
      task => true,
      task => false,
    ];
    const producer = createRepositoryTaskProducer(
      RepositoryTasks.DependencyReport,
      filters,
      loggerFactory
    );

    expect(producer(repository)).toBeUndefined();
  });

  test('Tasks are produced with appropriate breadcrumb logging', () => {
    const mockLogger = createLogger(new EventEmitter())();
    const infoSpy = jest.spyOn(mockLogger, 'info');
    const debugSpy = jest.spyOn(mockLogger, 'debug');
    loggerFactory.createLogger = jest.fn(channel => mockLogger);

    const producer = createRepositoryTaskProducer(
      RepositoryTasks.DependencyReport,
      [],
      loggerFactory
    );
    producer(repository);

    expect(infoSpy).toHaveBeenCalledTimes(1);
    expect(debugSpy).toHaveBeenCalledTimes(1);
  });

  test('When a task does not satisfy all filters, a debug message is logged', () => {
    const filters: RepositoryTaskFilter[] = [task => false];
    const mockLogger = createLogger(new EventEmitter())();
    const debugSpy = jest.spyOn(mockLogger, 'debug');

    loggerFactory.createLogger = jest.fn(channel => mockLogger);

    const producer = createRepositoryTaskProducer(
      RepositoryTasks.DependencyReport,
      filters,
      loggerFactory
    );
    producer(repository);

    expect(debugSpy).toHaveBeenCalledTimes(1);
  });
});
