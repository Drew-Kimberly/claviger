import {ExecutionStatus} from './types';

export const createExecutionResult = (
  output: string,
  code: number,
  signal: string
) => {
  return code === 0
    ? {status: ExecutionStatus.Success, code: code, output: output}
    : {
        status: ExecutionStatus.Failed,
        output: output,
        code: signal ?? code,
        error: new Error(
          `The command failed with exit code ${code} and signal ${signal}`
        ),
      };
};
