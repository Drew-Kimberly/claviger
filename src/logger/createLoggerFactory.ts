import {
  ILoggable,
  ILoggerFactory,
  LogEvents,
  LogFormatter,
  LogWriter,
} from './types';
import {EventEmitter} from 'events';
import {createLogger} from './createLogger';

export const createLoggerFactory = (
  eventEmitter: EventEmitter,
  logWriter: LogWriter<any>,
  logFormatter: LogFormatter
): ILoggerFactory => {
  const curriedLogWriter = (loggable: ILoggable) =>
    logWriter(loggable, logFormatter);

  eventEmitter.on(LogEvents.MESSAGE_LOGGED, curriedLogWriter);

  return {
    createLogger: createLogger(eventEmitter),
  };
};
