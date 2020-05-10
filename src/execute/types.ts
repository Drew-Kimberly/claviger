import {ChildProcess, SpawnOptions} from 'child_process';

export enum KillSignals {
  SIGINT = 'SIGINT',
  SIGHUP = 'SIGHUP',
}

export type ProcessSpawner = (
  cmd: string,
  args?: ReadonlyArray<string>,
  options?: SpawnOptions
) => ChildProcess;

export type Executable = (
  args?: ReadonlyArray<string>
) => Promise<IExecutionResult>;

export type ExecutableFactory = (
  cmd: string,
  onOutput?: OutputHandler,
  executor?: Executor,
  spawnProcess?: ProcessSpawner
) => Executable;

export type Executor = (
  childProcess: ChildProcess,
  onOutput: OutputHandler
) => Promise<IExecutionResult>;

export type PartialExecutor = (
  onOutput: OutputHandler
) => Promise<IExecutionResult>;

export type OutputHandler = (output: string) => void;

export enum ExecutionStatus {
  Success = 'SUCCESS',
  Failed = 'FAILED',
}

export interface IExecutionResult {
  status: ExecutionStatus;
  output: string;
  code: string | number | null;
  error?: Error;
}
