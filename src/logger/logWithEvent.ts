import {IEmitter, LogChannelHandler, LogEvents, LogSeverity} from './types';

export const logWithEvent = <S extends LogSeverity>(
  logChannelHandler: LogChannelHandler<S>,
  emitter: IEmitter
): LogChannelHandler<S> => (message: string) => {
  const loggable = logChannelHandler(message);
  emitter.emit(LogEvents.MESSAGE_LOGGED, loggable);
  return loggable;
};
