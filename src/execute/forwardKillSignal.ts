import {ChildProcess} from 'child_process';
import {KillSignals} from './types';
// eslint-disable-next-line no-undef
import Process = NodeJS.Process;

export const forwardKillSignals = (
  sourceProc: Process,
  destProc: ChildProcess
) =>
  Object.values(KillSignals).forEach(signal =>
    sourceProc.on(signal, () => destProc.kill(signal))
  );
