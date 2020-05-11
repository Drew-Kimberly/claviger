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
import {standardFormatter} from './formatters';
import {consoleWriter} from './writers';

export const createLoggerFactory = (
  logWriter: LogWriter = consoleWriter,
  logFormatter: LogFormatter<any> = standardFormatter,
  eventEmitter: IEmitter = new EventEmitter()
): ILoggerFactory => {
  const curriedLogWriter = (loggable: ILoggable) =>
    logWriter(loggable, logFormatter);

  eventEmitter.on(LogEvents.MESSAGE_LOGGED, curriedLogWriter);

  return {
    createLogger: createLogger(eventEmitter),
  };
};
