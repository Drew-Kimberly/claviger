import {defaultLoadContext} from '../defaultLoadContext';

describe('Test suite for defaultLoadContext', () => {
  test('The limit property is set to 100', () => {
    expect(defaultLoadContext.limit).toEqual(100);
  });
});
