import {isDefined} from '../util';

describe('Test suite for isDefined fn', () => {
  const testCases: Array<[any, boolean]> = [
    ['foo', true],
    ['', true],
    [1, true],
    [0, true],
    [true, true],
    [false, true],
    [null, true],
    [[], true],
    [[undefined], true],
    [{}, true],
    [{foo: undefined}, true],
    [undefined, false],
  ];

  test.each(testCases)(
    'Given an input of %p, isDefined returns %p',
    (input: any, expected: boolean) => {
      expect(isDefined(input)).toStrictEqual(expected);
    }
  );
});
