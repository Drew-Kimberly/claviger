import {
  ExecutionStatus,
  Executor,
  IExecutionResult,
  OutputHandler,
} from './types';
import {ChildProcess} from 'child_process';
import {createExecutionResult} from './createExecutionResult';

export const execute: Executor = (
  childProcess: ChildProcess,
  onOutput: OutputHandler
) => {
  const result: Promise<IExecutionResult> = new Promise(resolve => {
    let output = '';

    childProcess.stdout.on('data', data => {
      onOutput(data);
      output += data;
    });

    childProcess.stderr.on('data', data => {
      onOutput(data);
      output += data;
    });

    childProcess.on('close', (code: number, signal: string) =>
      resolve(createExecutionResult(output, code, signal))
    );

    childProcess.on('exit', (code: number, signal: string) =>
      resolve(createExecutionResult(output, code, signal))
    );

    childProcess.on('error', (err: Error) =>
      resolve({
        status: ExecutionStatus.Failed,
        code: null,
        output: output,
        error: err,
      })
    );

    childProcess.on('disconnect', () =>
      resolve({
        status: ExecutionStatus.Failed,
        output: output,
        code: null,
        error: new Error(
          `The child process with pid ${process.pid} has been disconnected`
        ),
      })
    );
  });
  result.finally(() => childProcess.kill());

  return result;
};
