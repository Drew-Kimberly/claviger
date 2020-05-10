import {ExecutionStatus, IExecutionResult} from './types';

export const isExecutionSuccessful = (result: IExecutionResult) =>
  result.status === ExecutionStatus.Success;
