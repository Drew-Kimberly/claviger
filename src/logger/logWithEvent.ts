import {LogChannelHandler, LogEvents, LogSeverity} from './types';
import {EventEmitter} from 'events';

export const logWithEvent = <S extends LogSeverity>(
  logChannelHandler: LogChannelHandler<S>,
  emitter: EventEmitter
): LogChannelHandler<S> => (message: string) => {
  const loggable = logChannelHandler(message);
  emitter.emit(LogEvents.MESSAGE_LOGGED, loggable);
  return loggable;
};
