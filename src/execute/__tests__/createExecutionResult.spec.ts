import {ExecutionStatus, IExecutionResult, KillSignals} from '../types';
import {createExecutionResult} from '../createExecutionResult';

describe('Test suite for createExecutionResult', () => {
  test('A successful result is returned when a code of 0 is provided', () => {
    const output = 'hello world';
    const code = 0;
    const signal = null;
    const expected: IExecutionResult = {
      status: ExecutionStatus.Success,
      code: code,
      output: output,
    };

    expect(createExecutionResult(output, code, signal)).toEqual(expected);
  });

  test('The error property is not populated on the result given a successful execution', () => {
    const output = 'hello world';
    const code = 0;
    const signal = null;

    const result = createExecutionResult(output, code, signal);
    expect(result.error).toEqual(undefined);
  });

  test('A failed result is returned when a non-zero code is provided', () => {
    const output = 'hello world';
    const code = 1;
    const signal = null;

    expect(createExecutionResult(output, code, signal).status).toEqual(
      ExecutionStatus.Failed
    );
  });

  test('A failed result is returned when an exit signal is provided', () => {
    const output = 'hello world';
    const code = null;
    const signal = KillSignals.SIGINT;

    expect(createExecutionResult(output, code, signal).status).toEqual(
      ExecutionStatus.Failed
    );
  });

  test('The error property is populated when execution fails', () => {
    const output = 'hello world';
    const code = 1;
    const signal = null;

    expect(createExecutionResult(output, code, signal).error).toBeInstanceOf(
      Error
    );
  });
});
