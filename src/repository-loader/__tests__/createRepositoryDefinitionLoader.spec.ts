import {createRepositoryDefinitionLoader} from '../createRepositoryDefinitionLoader';
import {createMemorySource} from '../sources';
import {createMockDefinitions} from '../__fixtures__';
import {createDelayedMemorySource} from '../__fixtures__/delayed-memory-source';
import {
  PackageManagers,
  RepositoryDefinition,
  SecurityVulnerabilitySeverities,
} from '../../repository-definition';
import {FailedLoadHandler} from '../types';
import {createErrorSource} from '../__fixtures__/error-source';

describe('Test suite for createRepositoryDefinitionLoader', () => {
  test('Given an empty source array, an observable is returned that returns no definitions', done => {
    const onDefinition = jest.fn(definition => {});
    const loader = createRepositoryDefinitionLoader([]);

    loader.subscribe(
      onDefinition,
      error => {},
      () => {
        expect(onDefinition).toBeCalledTimes(0);
        done();
      }
    );
  });

  test('Given a source that returns no definitions, an observable is returned that returns no definitions', done => {
    const onDefinition = jest.fn(definition => {});
    const loader = createRepositoryDefinitionLoader([createMemorySource([])]);
    loader.subscribe(
      onDefinition,
      error => {},
      () => {
        expect(onDefinition).toBeCalledTimes(0);
        done();
      }
    );
  });

  test('All definitions from a single source are pushed to the observable subscription', done => {
    const expected = ['repository-1', 'repository-2'];
    const processedDefinitions: string[] = [];
    const source = createMemorySource(createMockDefinitions(2));
    const loader = createRepositoryDefinitionLoader([source]);

    loader.subscribe(
      definition => processedDefinitions.push(definition.id),
      error => {},
      () => {
        expect(processedDefinitions).toEqual(expected);
        done();
      }
    );
  });

  test('Repository definitions that are output by the observable have default values populated', done => {
    const source = createMemorySource(createMockDefinitions(1));
    const expected: RepositoryDefinition = {
      id: 'repository-1',
      name: 'Repository Fixture 1',
      packageManager: PackageManagers.NPM,
      emails: [],
      gitRepository: {
        isMonorepo: false,
        ref: 'master',
        url: 'testing',
      },
      dependencyReport: {
        enabled: true,
        includeSecurityOverview: true,
      },
      securityAlert: {
        enabled: true,
        minSeverity: SecurityVulnerabilitySeverities.High,
      },
    };

    const loader = createRepositoryDefinitionLoader([source]);

    loader.subscribe(
      definition => expect(definition).toEqual(expected),
      error => {},
      () => done()
    );
  });

  test('All definitions from multiple sources are pushed to the observable subscription', done => {
    const expected = [
      'repository-1',
      'repository-2',
      'repository-11',
      'repository-12',
    ];
    const processedDefinitions: string[] = [];
    const source1 = createMemorySource(createMockDefinitions(2, 10));
    const source2 = createDelayedMemorySource(createMockDefinitions(2), 200);
    const loader = createRepositoryDefinitionLoader([source1, source2]);

    loader.subscribe(
      definition => processedDefinitions.push(definition.id),
      error => {},
      () => {
        expect(processedDefinitions.sort()).toEqual(expected.sort());
        done();
      }
    );
  });

  test('The onFailedLoad function is invoked on error', done => {
    const onFailure: FailedLoadHandler = jest.fn((source, e) => {});

    const source = createErrorSource(createMockDefinitions(2));
    const loader = createRepositoryDefinitionLoader([source], onFailure);

    loader.subscribe(
      definition => {},
      error => {},
      () => {
        expect(onFailure).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  test('A source failure prevents further definitions from being pushed for that source', done => {
    const expected = ['repository-1', 'repository-2'];
    const processedDefinitions: string[] = [];
    const onFailure: FailedLoadHandler = jest.fn((source, e) => {});
    const source = createErrorSource(createMockDefinitions(5), 2);
    const loader = createRepositoryDefinitionLoader([source], onFailure, {
      limit: 2,
    });

    loader.subscribe(
      definition => processedDefinitions.push(definition.id),
      error => {},
      () => {
        expect(processedDefinitions.sort()).toEqual(expected.sort());
        done();
      }
    );
  });

  test('A failure at a single source does not prevent other sources from pushing definitions', done => {
    const expected = [
      'repository-1',
      'repository-2',
      'repository-11',
      'repository-12',
    ];
    const processedDefinitions: string[] = [];
    const onFailure: FailedLoadHandler = jest.fn((source, e) => {});
    const source1 = createErrorSource(createMockDefinitions(5), 2);
    const source2 = createDelayedMemorySource(
      createMockDefinitions(2, 10),
      200
    );

    const loader = createRepositoryDefinitionLoader(
      [source1, source2],
      onFailure,
      {
        limit: 2,
      }
    );

    loader.subscribe(
      definition => processedDefinitions.push(definition.id),
      error => {},
      () => {
        expect(processedDefinitions.sort()).toEqual(expected.sort());
        done();
      }
    );
  });
});
