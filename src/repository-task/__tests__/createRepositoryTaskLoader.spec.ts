import {
  IRepositoryTask,
  RepositoryTaskProducer,
  RepositoryTasks,
} from '../types';
import {createRepositoryTask} from '../createRepositoryTask';
import {
  PackageManagers,
  RepositoryDefinition,
} from '../../repository-definition';
import {createRepositoryTaskLoader} from '../createRepositoryTaskLoader';
import {createRepositoryLoader, Loader} from '../../repository-loader';
import {IRepository} from '../../repository';
import {createMemorySource} from '../../repository-loader/sources/memory-source';

describe('Test suite for createRepositoryTaskLoader', () => {
  const createMockTaskProducer: (
    returnTask?: boolean
  ) => RepositoryTaskProducer = (returnTask = true) => repository => {
    return returnTask
      ? createRepositoryTask(RepositoryTasks.DependencyReport, repository)
      : undefined;
  };

  const definitions: RepositoryDefinition[] = [
    {
      id: 'foo',
      name: 'Foo Repo',
      packageManager: PackageManagers.NPM,
      gitRepository: {
        url: 'foo-git-url',
      },
      emails: [],
      securityAlert: {
        enabled: true,
      },
      dependencyReport: {
        enabled: true,
      },
    },
  ];

  const repoLoader: Loader<IRepository> = createRepositoryLoader([
    createMemorySource(definitions),
  ]);

  test('Returns an observable with a subscribe fn', () => {
    expect(
      createRepositoryTaskLoader(createMockTaskProducer(), repoLoader).subscribe
    ).toBeInstanceOf(Function);
  });

  test('All unfiltered repository tasks are passed to the observable subscribe fn', done => {
    const results: IRepositoryTask[] = [];

    createRepositoryTaskLoader(
      createMockTaskProducer(true),
      repoLoader
    ).subscribe(
      task => {
        results.push(task);
      },
      error => {},
      () => {
        expect(results.length).toEqual(definitions.length);
        expect(results[0].definition.id).toEqual(definitions[0].id);
        done();
      }
    );
  });

  test('All filtered repository tasks never passed to the subscribe fn', done => {
    const results: IRepositoryTask[] = [];

    createRepositoryTaskLoader(
      createMockTaskProducer(false),
      repoLoader
    ).subscribe(
      task => {
        results.push(task);
      },
      error => {},
      () => {
        expect(results.length).toEqual(0);
        done();
      }
    );
  });
});
