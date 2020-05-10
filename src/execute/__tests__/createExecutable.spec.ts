import {createExecutable} from '../createExecutable';
import {
  ExecutionStatus,
  Executor,
  IExecutionResult,
  OutputHandler,
  ProcessSpawner,
} from '../types';
import {spawn} from 'child_process';

describe('Test suite for createExecutable', () => {
  const result: IExecutionResult = {
    status: ExecutionStatus.Success,
    code: 0,
    output: '',
  };

  const onOutput: OutputHandler = (output: string) => {};
  const executor: Executor = async (proc, onOutput) => result;
  const assertSpawn: (assertion) => ProcessSpawner = assertion => (
    cmd,
    args,
    options
  ) => {
    assertion(cmd, args, options);
    return jest.fn(spawn)(cmd, args, options);
  };

  test('createExecutable returns a callable executable', () => {
    const hi = createExecutable('echo "hi"');
    expect(hi).toBeInstanceOf(Function);
  });

  test('createExecutable returns a callable executable which returns an execution result', async () => {
    const hi = createExecutable('echo "hi"');
    const result = await hi();
    expect(result.status).toEqual(ExecutionStatus.Success);
  });

  test('The created executable invokes the provided executor fn', async () => {
    const mockExecutor = jest.fn(executor);
    const cmd = 'echo "hi"';
    const hi = createExecutable(cmd, onOutput, mockExecutor);
    await hi();

    expect(mockExecutor).toHaveBeenCalledTimes(1);
  });

  test('The created executable can be passed cmd args', async done => {
    const expected = ['foo', 'bar'];
    const assertion = (cmd, args, options): void => {
      expect(args).toStrictEqual(expected);
      done();
    };

    const hi = createExecutable(
      'echo "hi',
      onOutput,
      executor,
      assertSpawn(assertion)
    );
    await hi(expected);
  });

  test('The process spawner uses shell mode.', async done => {
    const assertion = (cmd, args, options): void => {
      expect(options.shell).toStrictEqual(true);
      done();
    };

    const hi = createExecutable(
      'echo "hi',
      onOutput,
      executor,
      assertSpawn(assertion)
    );
    await hi();
  });
});
