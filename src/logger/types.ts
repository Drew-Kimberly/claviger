import {Factory} from '../util';

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

export const DEFAULT_LOG_CHANNEL = 'default';

export interface ILoggerFactory {
  createLogger: (channel?: LogChannelName) => Logger;
}

export interface ILoggable<S extends LogSeverity = LogSeverity> {
  severity: S;
  channel: LogChannelName;
  timestamp: number;
  message: string;
  context: any[];
}

export interface ILogChannel {
  debug: LogChannelHandler<LogSeverity.DEBUG>;
  info: LogChannelHandler<LogSeverity.INFO>;
  notice: LogChannelHandler<LogSeverity.NOTICE>;
  warning: LogChannelHandler<LogSeverity.WARNING>;
  error: LogChannelHandler<LogSeverity.ERROR>;
  critical: LogChannelHandler<LogSeverity.CRITICAL>;
}

export interface IEmitter {
  emit: (event: LogEvents, loggable: ILoggable) => void;
  on: (event: LogEvents, handler: (loggable: ILoggable) => void) => void;
}

export type LogChannelHandler<S extends LogSeverity = LogSeverity> = (
  message: string,
  ...context: any[]
) => ILoggable<S>;

export type LogChannelName = string;

export type LogChannelFactory = Factory<LogChannelName, ILogChannel>;

export type Logger = ILogChannel;

export type LogFormatter<T = string> = (loggable: ILoggable) => T;

export type LogWriter = (
  loggable: ILoggable,
  formatter: LogFormatter
) => Promise<void>;
