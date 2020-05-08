import {ILoggable, LogSeverity} from '../../types';
import {jsonFormatter} from '../../formatters';

describe('Test suite for jsonFormatter', () => {
  const loggable: ILoggable = {
    severity: LogSeverity.INFO,
    channel: '',
    timestamp: 0,
    message: 'hello world',
    context: [],
  };

  test('jsonFormatter returns the a JSON string representation of the loggable', () => {
    expect(jsonFormatter(loggable)).toEqual(JSON.stringify(loggable));
  });
});
