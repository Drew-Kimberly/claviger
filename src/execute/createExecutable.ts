import {
  Executable,
  ExecutableFactory,
  Executor,
  OutputHandler,
  ProcessSpawner,
} from './types';
import {spawn} from 'child_process';
import {execute} from './execute';
import {withForwardedKillSignals} from './withForwardedKillSignals';

const nullOutputHandler: OutputHandler = (output: string) => {};

export const createExecutable: ExecutableFactory = (
  cmd: string,
  onOutput: OutputHandler = nullOutputHandler,
  executor: Executor = execute,
  spawnProcess: ProcessSpawner = spawn
): Executable => {
  return (args = []) => {
    const childProc = spawnProcess(cmd, args, {shell: true});
    return withForwardedKillSignals(process, childProc, executor)(onOutput);
  };
};
