import {LogFormatter} from '../types';

export const standardFormatter: LogFormatter = loggable => {
  return `[${loggable.severity}] [${loggable.channel}] [${new Date(
    loggable.timestamp
  ).toISOString()}] -- ${loggable.message}`;
};
