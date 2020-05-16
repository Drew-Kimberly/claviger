import * as path from 'path';
import {asyncGlob} from '../../../sources/yaml-source/asyncGlob';

describe('Test suite for asyncGlob', () => {
  test('A promise that resolves to the file matches is returned', async () => {
    const testPath = path.join(
      __dirname,
      '../../..',
      '__fixtures__/repositories/mixed'
    );
    const matches = await asyncGlob(`${testPath}/**.yml`);

    expect(matches.length).toEqual(2);
  });
});
