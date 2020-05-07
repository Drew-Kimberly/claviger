import {ILoggable, LogChannelName, LogSeverity} from './types';

export const createLoggable = <S extends LogSeverity>(
  severity: S,
  channel: LogChannelName,
  message: string
): ILoggable<S> => ({
  severity: severity,
  channel: channel ?? '',
  timestamp: Date.now(),
  message: message,
});
