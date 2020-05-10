import {ExecutionStatus, IExecutionResult} from '../types';
import {isExecutionSuccessful} from '../isExecutionSuccessful';

describe('Test suite for isExecutionSuccessful', () => {
  test('Execution result with a successful status returns true', () => {
    const result: IExecutionResult = {
      status: ExecutionStatus.Success,
      code: 0,
      output: '',
    };

    expect(isExecutionSuccessful(result)).toStrictEqual(true);
  });

  test('Execution result with a failed status returns false', () => {
    const result: IExecutionResult = {
      status: ExecutionStatus.Failed,
      code: 1,
      output: '',
    };

    expect(isExecutionSuccessful(result)).toStrictEqual(false);
  });
});
