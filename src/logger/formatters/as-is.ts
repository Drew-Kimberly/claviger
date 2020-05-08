import {ILoggable, LogFormatter} from '../types';

export const asIsFormatter: LogFormatter<ILoggable> = loggable => loggable;
