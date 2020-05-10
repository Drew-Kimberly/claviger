// eslint-disable-next-line no-undef
import Process = NodeJS.Process;
import {Executor, OutputHandler, PartialExecutor} from './types';
import {forwardKillSignals} from './forwardKillSignal';
import {ChildProcess} from 'child_process';

export const withForwardedKillSignals = (
  proc: Process,
  childProc: ChildProcess,
  executor: Executor
): PartialExecutor => {
  forwardKillSignals(proc, childProc);
  return (onOutput: OutputHandler) => executor(childProc, onOutput);
};
