import {createMemorySource} from '../../memory-source';
import {createMockDefinitions} from '../../__fixtures__';

describe('Test suite for createMemorySource', () => {
  test('The source ID equals "memory-source"', () => {
    const source = createMemorySource([]);
    expect(source.id()).toEqual('memory-source');
  });

  test('get() returns a section of definitions given by the limit and pos params', async () => {
    const expected = ['repository-3', 'repository-4'];
    const limit = 2;
    const pos = 2;

    const source = createMemorySource(createMockDefinitions(10));
    const result = await source.get(limit, pos);

    expect(result.map(def => def.id)).toEqual(expected);
  });

  test('get() returns an empty array given the memory source is provided no definitions', async () => {
    const expected = [];
    const limit = 5;
    const pos = 2;

    const source = createMemorySource([]);
    const result = await source.get(limit, pos);

    expect(result).toEqual(expected);
  });

  test('get() returns an empty array given an out-of-bounds pos value', async () => {
    const expected = [];
    const limit = 2;
    const pos = 12;

    const source = createMemorySource(createMockDefinitions(10));
    const result = await source.get(limit, pos);

    expect(result).toEqual(expected);
  });
});
