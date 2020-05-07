import {ILogChannel, LogChannelName, Logger, LogSeverity} from './types';
import {createLogChannel} from './createLogChannel';
import {logWithEvent} from './logWithEvent';
import {EventEmitter} from 'events';

export const createLogger = (emitter: EventEmitter) => (
  channel: LogChannelName
): Logger => {
  const logChannel: ILogChannel = createLogChannel(channel);

  return {
    debug: logWithEvent<LogSeverity.DEBUG>(logChannel.debug, emitter),
    info: logWithEvent<LogSeverity.INFO>(logChannel.info, emitter),
    notice: logWithEvent<LogSeverity.NOTICE>(logChannel.notice, emitter),
    warning: logWithEvent<LogSeverity.WARNING>(logChannel.warning, emitter),
    error: logWithEvent<LogSeverity.ERROR>(logChannel.error, emitter),
    critical: logWithEvent<LogSeverity.CRITICAL>(logChannel.critical, emitter),
  };
};
