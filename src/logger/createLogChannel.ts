import {LogChannelName, LogChannelFactory, LogSeverity} from './types';
import {createLoggable} from './createLoggable';

export const createLogChannel: LogChannelFactory = (
  channel: LogChannelName
) => ({
  debug: (message, ...context) =>
    createLoggable<LogSeverity.DEBUG>(
      LogSeverity.DEBUG,
      channel,
      message,
      context
    ),

  info: (message, ...context) =>
    createLoggable<LogSeverity.INFO>(
      LogSeverity.INFO,
      channel,
      message,
      context
    ),

  notice: (message, ...context) =>
    createLoggable<LogSeverity.NOTICE>(
      LogSeverity.NOTICE,
      channel,
      message,
      context
    ),

  warning: (message, ...context) =>
    createLoggable<LogSeverity.WARNING>(
      LogSeverity.WARNING,
      channel,
      message,
      context
    ),

  error: (message, ...context) =>
    createLoggable<LogSeverity.ERROR>(
      LogSeverity.ERROR,
      channel,
      message,
      context
    ),

  critical: (message, ...context) =>
    createLoggable<LogSeverity.CRITICAL>(
      LogSeverity.CRITICAL,
      channel,
      message,
      context
    ),
});
