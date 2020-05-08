import {LogFormatter} from '../types';

export const jsonFormatter: LogFormatter = loggable => JSON.stringify(loggable);
