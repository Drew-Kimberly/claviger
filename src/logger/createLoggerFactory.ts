import {
  IEmitter,
  ILoggable,
  ILoggerFactory,
  LogEvents,
  LogFormatter,
  LogWriter,
} from './types';
import {createLogger} from './createLogger';
import {EventEmitter} from 'events';

export const createLoggerFactory = (
  logWriter: LogWriter,
  logFormatter: LogFormatter<any>,
  eventEmitter: IEmitter = new EventEmitter()
): ILoggerFactory => {
  const curriedLogWriter = (loggable: ILoggable) =>
    logWriter(loggable, logFormatter);

  eventEmitter.on(LogEvents.MESSAGE_LOGGED, curriedLogWriter);

  return {
    createLogger: createLogger(eventEmitter),
  };
};
