import {
  IEmitter,
  ILoggable,
  ILoggerFactory,
  LogEvents,
  LogFormatter,
  LogWriter,
} from './types';
import {createLogger} from './createLogger';

export const createLoggerFactory = (
  eventEmitter: IEmitter,
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
