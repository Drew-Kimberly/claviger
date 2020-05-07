import {LogWriter} from '../types';

export const consoleWriter: LogWriter<void> = async (loggable, formatter) => {
  console.log(formatter(loggable));
};
