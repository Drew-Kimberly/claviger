import {ExecutionStatus, IExecutionResult, OutputHandler} from '../types';
import {execute} from '../execute';
import {
  createMockChildProcess,
  IExitEventContext,
} from '../__mocks__/createMockChildProcess';

describe('Test suite for execute', () => {
  const onOutput: OutputHandler = (output: string) => {};

  test('A promise that resolves to an IExecutionResult is returned on the "close" event', async () => {
    const code = 0;
    const signal = null;
    const eventContext: IExitEventContext = {
      event: 'close',
      args: [code, signal],
    };
    const result = await execute(
      createMockChildProcess(eventContext),
      onOutput
    );

    const expected: IExecutionResult = {
      status: ExecutionStatus.Success,
      code: code,
      output: '',
    };
    expect(result).toEqual(expected);
  });

  test('A promise that resolves to an IExecutionResult is returned on the "exit" event', async () => {
    const code = 0;
    const signal = null;
    const eventContext: IExitEventContext = {
      event: 'exit',
      args: [code, signal],
    };
    const result = await execute(
      createMockChildProcess(eventContext),
      onOutput
    );

    const expected: IExecutionResult = {
      status: ExecutionStatus.Success,
      code: code,
      output: '',
    };
    expect(result).toEqual(expected);
  });

  test('A promise that resolves to failed IExecutionResult is returned on the "error" event', async () => {
    const error = new Error('An error has occurred');
    const eventContext: IExitEventContext = {
      event: 'error',
      args: [error],
    };
    const result = await execute(
      createMockChildProcess(eventContext),
      onOutput
    );

    const expected: IExecutionResult = {
      status: ExecutionStatus.Failed,
      code: null,
      output: '',
      error: error,
    };
    expect(result).toEqual(expected);
  });

  test('A promise that resolves to failed IExecutionResult is returned on the "disconnect" event', async () => {
    const eventContext: IExitEventContext = {
      event: 'disconnect',
      args: [],
    };
    const result = await execute(
      createMockChildProcess(eventContext),
      onOutput
    );

    expect(result.status).toEqual(ExecutionStatus.Failed);
    expect(result.error).toBeInstanceOf(Error);
  });

  test('The onOutput handler is invoked when data is received via stdout', async () => {
    const mockOutputHandler = jest.fn(onOutput);
    const code = 0;
    const signal = null;
    const stdout = 'hello world';
    const eventContext: IExitEventContext = {
      event: 'close',
      args: [code, signal],
    };

    await execute(
      createMockChildProcess(eventContext, stdout),
      mockOutputHandler
    );

    expect(mockOutputHandler).toHaveBeenCalledTimes(1);
  });

  test('The onOutput handler is invoked when data is received via stderr', async () => {
    const mockOutputHandler = jest.fn(onOutput);
    const code = 0;
    const signal = null;
    const stderr = 'hello world';
    const eventContext: IExitEventContext = {
      event: 'close',
      args: [code, signal],
    };

    await execute(
      createMockChildProcess(eventContext, null, stderr),
      mockOutputHandler
    );

    expect(mockOutputHandler).toHaveBeenCalledTimes(1);
  });

  test('Data read from stdout is accessible via the output property of the resolved result', async () => {
    const code = 0;
    const signal = null;
    const stdout = 'hello world';
    const eventContext: IExitEventContext = {
      event: 'close',
      args: [code, signal],
    };

    const result = await execute(
      createMockChildProcess(eventContext, stdout),
      onOutput
    );

    expect(result.output).toEqual(stdout);
  });

  test('Data read from stderr is accessible via the output property of the resolved result', async () => {
    const code = 0;
    const signal = null;
    const stderr = 'hello world';
    const eventContext: IExitEventContext = {
      event: 'close',
      args: [code, signal],
    };

    const result = await execute(
      createMockChildProcess(eventContext, null, stderr),
      onOutput
    );

    expect(result.output).toEqual(stderr);
  });

  test('The child process is killed once the promise resolves', async () => {
    const onKill = jest.fn(signal => {});
    const eventContext: IExitEventContext = {
      event: 'close',
      args: [],
    };

    await execute(
      createMockChildProcess(eventContext, null, null, onKill),
      onOutput
    );

    expect(onKill).toHaveBeenCalledTimes(1);
  });
});
