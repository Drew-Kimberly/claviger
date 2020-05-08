import {createLoggerFactory} from './createLoggerFactory';
import * as LogWriters from './writers';
import * as LogFormatters from './formatters';
import {ILoggerFactory} from './types';

export const loggerFactory: ILoggerFactory = createLoggerFactory(
  LogWriters.consoleWriter,
  LogFormatters.standardFormatter
);
