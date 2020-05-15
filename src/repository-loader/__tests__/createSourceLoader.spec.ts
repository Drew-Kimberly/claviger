import {createSourceLoader} from '../createSourceLoader';
import {createMemorySource} from '../sources';
import {createMockDefinitions} from '../__fixtures__';
import {FailedLoadHandler} from '../types';
import {createErrorSource} from '../__fixtures__/error-source';

describe('Test suite for createSourceLoader', () => {
  test('Given an "empty" source, an observable is returned that pushes no definitions', done => {
    const onDefinition = jest.fn(definition => {});
    const loader = createSourceLoader(createMemorySource([]));

    loader.subscribe(
      onDefinition,
      error => {},
      () => {
        expect(onDefinition).toHaveBeenCalledTimes(0);
        done();
      }
    );
  });

  test('An observable is returned that pushes all definitions from the given source', done => {
    const expected = ['repository-1', 'repository-2'];
    const processedDefinitions: string[] = [];

    const loader = createSourceLoader(
      createMemorySource(createMockDefinitions(2))
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

  test('The returned observable pushes all definitions given a source that contains more items than the load limit', done => {
    const expected = [
      'repository-1',
      'repository-2',
      'repository-3',
      'repository-4',
    ];
    const processedDefinitions: string[] = [];

    const loader = createSourceLoader(
      createMemorySource(createMockDefinitions(4)),
      (source, e) => {},
      {limit: 2}
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

  test('The onFailedLoad fn is invoked on a source error', done => {
    const onFailure: FailedLoadHandler = jest.fn((source, e) => {});

    const loader = createSourceLoader(
      createErrorSource(createMockDefinitions(2)),
      onFailure
    );

    loader.subscribe(
      definition => {},
      error => {},
      () => {
        expect(onFailure).toHaveBeenCalledTimes(1);
        done();
      }
    );
  });

  test('Definitions preceding the source error are still pushed by the observable', done => {
    const onFailure: FailedLoadHandler = jest.fn((source, e) => {});
    const expected = ['repository-1', 'repository-2'];
    const processedDefinitions: string[] = [];

    const loader = createSourceLoader(
      createErrorSource(createMockDefinitions(4), 3),
      onFailure,
      {limit: 2}
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
