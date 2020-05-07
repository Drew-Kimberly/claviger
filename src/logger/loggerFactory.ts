import {createLoggerFactory} from './createLoggerFactory';
import {EventEmitter} from 'events';
import * as LogWriters from './writers';
import * as LogFormatters from './formatters';
import {ILoggerFactory} from './types';

export const loggerFactory: ILoggerFactory = createLoggerFactory(
  new EventEmitter(),
  LogWriters.consoleWriter,
  LogFormatters.standardFormatter
);
