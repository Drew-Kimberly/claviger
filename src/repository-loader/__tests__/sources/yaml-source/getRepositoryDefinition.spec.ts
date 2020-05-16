import {createLoggerFactory, Logger, nullWriter} from '../../../../logger';
import * as path from 'path';
import {getRepositoryDefinition} from '../../../sources/yaml-source/getRepositoryDefinition';

describe('Test suite for getRepositoryDefinition', () => {
  const repoFixturesPath = path.join(
    __dirname,
    '../../..',
    '__fixtures__/repositories'
  );
  const mockLogger: Logger = createLoggerFactory(nullWriter).createLogger();

  afterEach(() => jest.clearAllMocks());

  test('Returns a repository definition given a valid path', async () => {
    const validPath = path.join(
      repoFixturesPath,
      'valid/valid1.repository.yml'
    );
    const expected = {
      id: 'valid-1',
      name: 'Test Repo 1',
      packageManager: 'npm',
      emails: [],
      gitRepository: {
        url: 'testing',
      },
      dependencyReport: {
        enabled: true,
      },
      securityAlert: {
        enabled: true,
      },
    };

    const result = await getRepositoryDefinition(validPath, mockLogger);

    expect(result).toEqual(expected);
  });

  test('Returns undefined given a bad file path', async () => {
    const notFoundPath = path.join(
      repoFixturesPath,
      'bad-path/bad.repository.yml'
    );

    const result = await getRepositoryDefinition(notFoundPath, mockLogger);

    expect(result).toBeUndefined();
  });

  test('Logs an error message given a bad path', async () => {
    const spy = jest.spyOn(mockLogger, 'error');
    const notFoundPath = path.join(
      repoFixturesPath,
      'bad-path/bad.repository.yml'
    );

    await getRepositoryDefinition(notFoundPath, mockLogger);

    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Returns undefined given a file that has invalid YAML', async () => {
    const invalidPath = path.join(
      repoFixturesPath,
      'invalid/invalid.repository.yml'
    );

    const result = await getRepositoryDefinition(invalidPath, mockLogger);

    expect(result).toBeUndefined();
  });

  test('Logs an error given a file that has invalid YAML', async () => {
    const spy = jest.spyOn(mockLogger, 'error');
    const invalidPath = path.join(
      repoFixturesPath,
      'invalid/invalid.repository.yml'
    );

    await getRepositoryDefinition(invalidPath, mockLogger);

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
