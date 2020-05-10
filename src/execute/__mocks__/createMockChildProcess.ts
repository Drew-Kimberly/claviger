import {ChildProcess} from 'child_process';
import {EventEmitter} from 'events';
import {Readable, Writable} from 'stream';

export type ExitEvent = 'close' | 'exit' | 'disconnect' | 'error';
export interface IExitEventContext {
  event: ExitEvent;
  args: any[];
}

const emitEvent = (
  e: IExitEventContext,
  proc: ChildProcess,
  ready: boolean
): void => {
  if (ready) {
    proc.emit(e.event, ...e.args);
  }
};

export const createMockChildProcess = (
  event: IExitEventContext,
  stdout: string | null = null,
  stderr: string | null = null,
  onKill: (signal?: string) => void = signal => {}
): ChildProcess => {
  const childProc: ChildProcess = new EventEmitter() as ChildProcess;
  let stdoutDone = false;
  let stderrDone = false;

  childProc.stdin = new Writable({
    write() {},
    final() {},
  });

  childProc.stdout = new Readable({
    read() {
      if (stdout) childProc.stdout.emit('data', stdout);
      this.push(null);
      stdoutDone = true;
      emitEvent(event, childProc, stdoutDone && stderrDone);
    },
  });

  childProc.stderr = new Readable({
    read() {
      if (stderr) childProc.stderr.emit('data', stderr);
      this.push(null);
      stderrDone = true;
      emitEvent(event, childProc, stdoutDone && stderrDone);
    },
  });

  childProc.kill = (signal?: string) => onKill(signal);

  return childProc;
};
