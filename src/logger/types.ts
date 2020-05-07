import {Factory, Maybe} from '../util';

export enum LogSeverity {
  DEBUG = 'DEBUG',
  INFO = 'INFO',
  NOTICE = 'NOTICE',
  WARNING = 'WARNING',
  ERROR = 'ERROR',
  CRITICAL = 'CRITICAL',
}

export enum LogEvents {
  MESSAGE_LOGGED = 'message_logged',
}

export interface ILoggerFactory {
  createLogger: (channel: LogChannelName) => Logger;
}

export interface ILoggable<S extends LogSeverity = LogSeverity> {
  severity: S;
  channel: LogChannelName;
  timestamp: number;
  message: string;
}

export interface ILogChannel {
  debug: LogChannelHandler<LogSeverity.DEBUG>;
  info: LogChannelHandler<LogSeverity.INFO>;
  notice: LogChannelHandler<LogSeverity.NOTICE>;
  warning: LogChannelHandler<LogSeverity.WARNING>;
  error: LogChannelHandler<LogSeverity.ERROR>;
  critical: LogChannelHandler<LogSeverity.CRITICAL>;
}

export type LogChannelHandler<S extends LogSeverity = LogSeverity> = (
  message: string
) => ILoggable<S>;
export type LogChannelName = Maybe<string>;
export type LogChannelFactory = Factory<LogChannelName, ILogChannel>;
export type Logger = ILogChannel;
export type LogFormatter = (loggable: ILoggable) => string;
export type LogWriter<T> = (
  loggable: ILoggable,
  formatter: LogFormatter
) => Promise<T>;
