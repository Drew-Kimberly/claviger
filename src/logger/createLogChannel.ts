import {LogChannelName, LogChannelFactory, LogSeverity} from './types';
import {createLoggable} from './createLoggable';

export const createLogChannel: LogChannelFactory = (
  channel: LogChannelName = undefined
) => ({
  debug: message =>
    createLoggable<LogSeverity.DEBUG>(LogSeverity.DEBUG, channel, message),

  info: message =>
    createLoggable<LogSeverity.INFO>(LogSeverity.INFO, channel, message),

  notice: message =>
    createLoggable<LogSeverity.NOTICE>(LogSeverity.NOTICE, channel, message),

  warning: message =>
    createLoggable<LogSeverity.WARNING>(LogSeverity.WARNING, channel, message),

  error: message =>
    createLoggable<LogSeverity.ERROR>(LogSeverity.ERROR, channel, message),

  critical: message =>
    createLoggable<LogSeverity.CRITICAL>(
      LogSeverity.CRITICAL,
      channel,
      message
    ),
});
