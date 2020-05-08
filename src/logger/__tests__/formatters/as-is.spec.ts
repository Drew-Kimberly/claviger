import {ILoggable, LogSeverity} from '../../types';
import {asIsFormatter} from '../../formatters';

describe('Test suite for asIsFormatter', () => {
  const loggable: ILoggable = {
    severity: LogSeverity.INFO,
    channel: '',
    timestamp: 0,
    message: 'hello world',
    context: [],
  };

  test('asIsFormatter returns the loggable it was passed', () => {
    expect(asIsFormatter(loggable)).toEqual(loggable);
  });
});
