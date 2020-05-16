import {createYamlSource} from '../../../sources/yaml-source';
import * as path from 'path';
import {RepositoryDefinition} from '../../../../repository-definition';
import {createLoggerFactory, nullWriter} from '../../../../logger';

describe('Test suite for createYamlSource', () => {
  const repoFixturesPath = path.join(
    __dirname,
    '../../..',
    '__fixtures__/repositories'
  );

  const loggerFactoryMock = createLoggerFactory(nullWriter);

  test('The source can be created with default loggerFactory', () => {
    expect(createYamlSource(repoFixturesPath)).toBeDefined();
  });

  test('The source ID equals "yaml-source"', () => {
    const source = createYamlSource(repoFixturesPath, loggerFactoryMock);
    expect(source.id()).toEqual('yaml-source');
  });

  test('get() returns definitions given by the limit and pos params', async () => {
    const expected = ['valid-1', 'valid-2'];
    const limit = 2;
    const pos = 0;

    const source = createYamlSource(
      path.join(repoFixturesPath, 'valid'),
      loggerFactoryMock
    );
    const result = await source.get(limit, pos);

    expect(result.map(def => def.id)).toEqual(expected);
  });

  test('get() can be called repeatedly to incrementally retrieve all definitions at the given path.', async () => {
    const expected = [['valid-1'], ['valid-2'], ['valid-3']];
    const limit = 1;
    const definitions: Array<RepositoryDefinition[]> = [];

    const source = createYamlSource(
      path.join(repoFixturesPath, 'valid'),
      loggerFactoryMock
    );

    definitions.push(await source.get(limit, 0));
    definitions.push(await source.get(limit, 1));
    definitions.push(await source.get(limit, 2));

    expect(definitions.map(def => [def[0].id])).toEqual(expected);
  });

  test('get() returns no definitions given an invalid path', async () => {
    const expected = [];
    const limit = 2;
    const pos = 0;

    const source = createYamlSource(
      path.join(repoFixturesPath, 'bad-path'),
      loggerFactoryMock
    );
    const result = await source.get(limit, pos);

    expect(result).toEqual(expected);
  });

  test('get() returns no definitions given an out-of-bounds pos param', async () => {
    const expected = [];
    const limit = 2;
    const pos = 20;

    const source = createYamlSource(
      path.join(repoFixturesPath, 'valid'),
      loggerFactoryMock
    );
    const result = await source.get(limit, pos);

    expect(result).toEqual(expected);
  });

  test('get() returns no definitions given a valid, empty dir path', async () => {
    const expected = [];
    const limit = 2;
    const pos = 0;

    const source = createYamlSource(
      path.join(repoFixturesPath, 'empty'),
      loggerFactoryMock
    );
    const result = await source.get(limit, pos);

    expect(result).toEqual(expected);
  });

  test('get() returns no definitions given a directory with only invalid yaml defs', async () => {
    const expected = [];
    const limit = 2;
    const pos = 0;
    const source = createYamlSource(
      path.join(repoFixturesPath, 'invalid'),
      loggerFactoryMock
    );

    const definitions = await source.get(limit, pos);

    expect(definitions).toEqual(expected);
  });

  test('get() returns only valid definitions given a directory with both valid/invalid yaml defs', async () => {
    const expected = ['valid'];
    const limit = 2;
    const pos = 0;
    const source = createYamlSource(
      path.join(repoFixturesPath, 'mixed'),
      loggerFactoryMock
    );

    const result = await source.get(limit, pos);

    expect(result.map(def => def.id)).toEqual(expected);
  });

  test('get() returns all valid definitions given a nested directory structure', async () => {
    const expected = ['valid', 'valid-1', 'valid-2', 'valid-3'];
    const limit = 10;
    const pos = 0;
    const source = createYamlSource(repoFixturesPath, loggerFactoryMock);

    const result = await source.get(limit, pos);

    expect(result.map(def => def.id).sort()).toEqual(expected.sort());
  });
});
