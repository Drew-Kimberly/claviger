import {LogWriter} from '../types';

export const consoleWriter: LogWriter = async (loggable, formatter) => {
  console.log(formatter(loggable), ...loggable.context);
};
