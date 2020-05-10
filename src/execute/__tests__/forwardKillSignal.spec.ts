import {forwardKillSignals} from '../forwardKillSignal';
import {EventEmitter} from 'events';
// eslint-disable-next-line no-undef
import Process = NodeJS.Process;
import {
  createMockChildProcess,
  IExitEventContext,
} from '../__mocks__/createMockChildProcess';
import {KillSignals} from '../types';

describe('Test suite for forwardKillSignal', () => {
  Object.values(KillSignals).forEach(signal =>
    test(`${signal} signal is forwarded to the child process`, done => {
      const eventContext: IExitEventContext = {
        event: 'close',
        args: [],
      };
      const onKill = (sig?: string) => {
        expect(sig).toEqual(signal);
        done();
      };

      const sourceProcess = new EventEmitter() as Process;
      const childProcess = createMockChildProcess(
        eventContext,
        null,
        null,
        onKill
      );
      forwardKillSignals(sourceProcess, childProcess);

      sourceProcess.emit(signal, signal);
    })
  );
});
