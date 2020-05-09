import {ExecutableFactory, OutputHandler} from './types';
import {spawn} from 'child_process';
import {execute} from './execute';
import {forwardKillSignals} from './forwardKillSignal';

const nullOutputHandler: OutputHandler = (output: string) => {};

export const createExecutable: ExecutableFactory = (
  cmd: string,
  onOutput: OutputHandler = nullOutputHandler
) => {
  return (args = []) => {
    const childProc = spawn(cmd, args, {shell: true});
    forwardKillSignals(process, childProc);

    return execute(childProc, onOutput);
  };
};
