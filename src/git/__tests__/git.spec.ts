import {
  createCloneable,
  createGitService,
  gitCloneCommand,
  interpretCloneResult,
  logCloneFailure,
} from '../git';
import {ICloneable, IGit} from '../types';
import {
  createLoggerFactory,
  ILoggerFactory,
  Logger,
  nullWriter,
} from '../../logger';
import {
  createExecutable,
  ExecutableFactory,
  ExecutionStatus,
  IExecutionResult,
} from '../../execute';

describe('Test suite for createCloneable function', () => {
  test('A cloneable object is created', () => {
    const url = 'https://test.com';
    const branch = 'test';
    const depth = 123;
    const destination = '/test';

    const cloneable = createCloneable(url, branch, depth, destination);

    expect(cloneable.gitUrl()).toEqual(url);
    expect(cloneable.gitBranch()).toEqual(branch);
    expect(cloneable.cloneDepth()).toEqual(depth);
    expect(cloneable.cloneDestination()).toEqual(destination);
  });
});

describe('Test suite for gitCloneCommand function', () => {
  test('git CLI command is created given cloneable object', () => {
    const expected =
      'git clone --depth=2 test-git-url /test/clone -b foobranch';
    expect(
      gitCloneCommand(
        createCloneable('test-git-url', 'foobranch', 2, '/test/clone')
      )
    ).toEqual(expected);
  });
});

describe('Test suite for logCloneFailure function', () => {
  const logger: Logger = createLoggerFactory(nullWriter).createLogger();
  const url = 'https://test.com';
  const branch = 'test';
  const depth = 123;
  const destination = '/test';

  test('Log message is appropriate given the provided cloneable', () => {
    const cloneable: ICloneable = createCloneable(
      url,
      branch,
      depth,
      destination
    );
    const result: IExecutionResult = {
      status: ExecutionStatus.Failed,
      code: 1,
      output: '',
      error: new Error('test'),
    };

    const expected = `Failed cloning ${url} on branch ${branch} with depth ${depth} to ${destination}`;

    expect(logCloneFailure(logger, cloneable, result).message).toEqual(
      expected
    );
  });

  test('Loggable includes output as context', () => {
    const output = 'error output';
    const cloneable: ICloneable = createCloneable(
      url,
      branch,
      depth,
      destination
    );
    const result: IExecutionResult = {
      status: ExecutionStatus.Failed,
      code: 1,
      output: output,
      error: new Error('test'),
    };

    expect(logCloneFailure(logger, cloneable, result).context).toContain(
      output
    );
  });

  test('Loggable includes error object as context', () => {
    const error: Error = new Error('test');
    const cloneable: ICloneable = createCloneable(
      url,
      branch,
      depth,
      destination
    );
    const result: IExecutionResult = {
      status: ExecutionStatus.Failed,
      code: 1,
      output: '',
      error: error,
    };

    expect(logCloneFailure(logger, cloneable, result).context).toContain(error);
  });
});

describe('Test suite for interpretCloneResult function', () => {
  test('Returns true given a successful execution result', () => {
    const result: IExecutionResult = {
      status: ExecutionStatus.Success,
      code: 0,
      output: 'success',
    };

    expect(interpretCloneResult(result)).toStrictEqual(true);
  });

  test('Returns false given a failed execution result', () => {
    const result: IExecutionResult = {
      status: ExecutionStatus.Failed,
      code: 1,
      output: 'oh no',
      error: new Error('fail'),
    };

    expect(interpretCloneResult(result)).toStrictEqual(false);
  });

  test('Invokes the onFailure handler with the result given a failed execution', done => {
    const result: IExecutionResult = {
      status: ExecutionStatus.Failed,
      code: 1,
      output: 'oh no',
      error: new Error('fail'),
    };
    const onFailure = res => {
      expect(res).toEqual(result);
      done();
    };

    interpretCloneResult(result, onFailure);
  });
});

describe('Test suite for createGitService function', () => {
  const url = 'https://test.com';
  const branch = 'test';
  const depth = 123;
  const destination = '/test';

  const cloneable: ICloneable = createCloneable(
    url,
    branch,
    depth,
    destination
  );
  const mockLoggerFactory = createLoggerFactory(nullWriter);
  const createMockExecutableFactory = (
    result: IExecutionResult,
    assertion = (cmd: string) => {}
  ) => (cmd: string) => {
    assertion(cmd);
    return async () => result;
  };

  test('Creates an object with a callable clone() function', () => {
    const git: IGit = createGitService(createExecutable, mockLoggerFactory);
    expect(git.clone).toBeTruthy();
    expect(git.clone).toBeInstanceOf(Function);
  });

  test('Created clone() function executes a valid git CLI command', async done => {
    const expected = `git clone --depth=${depth} ${url} ${destination} -b ${branch}`;
    const assertion = (cmd: string) => {
      expect(cmd).toEqual(expected);
      done();
    };
    const mockResult: IExecutionResult = {
      status: ExecutionStatus.Success,
      code: 0,
      output: 'success',
    };

    const git: IGit = createGitService(
      createMockExecutableFactory(mockResult, assertion),
      mockLoggerFactory
    );

    await git.clone(createCloneable(url, branch, depth, destination));
  });

  test('Created clone() function resolves to true on success', async () => {
    const mockResult: IExecutionResult = {
      status: ExecutionStatus.Success,
      code: 0,
      output: 'success',
    };

    const git: IGit = createGitService(
      createMockExecutableFactory(mockResult),
      mockLoggerFactory
    );

    const result = await git.clone(
      createCloneable(url, branch, depth, destination)
    );

    expect(result).toStrictEqual(true);
  });

  test('Created clone() function resolves to false on failure', async () => {
    const mockResult: IExecutionResult = {
      status: ExecutionStatus.Failed,
      code: 1,
      output: 'fail',
      error: new Error('fail'),
    };

    const git: IGit = createGitService(
      createMockExecutableFactory(mockResult),
      mockLoggerFactory
    );

    const result = await git.clone(
      createCloneable(url, branch, depth, destination)
    );

    expect(result).toStrictEqual(false);
  });
});
