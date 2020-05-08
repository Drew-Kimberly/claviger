import {ILoggable, LogSeverity} from '../../types';
import {standardFormatter} from '../../formatters';

describe('Test suite for standardFormatter', () => {
  const loggable: ILoggable = {
    severity: LogSeverity.NOTICE,
    channel: 'foo',
    timestamp: 1577883600000,
    message: 'hello world',
    context: [],
  };

  test('standardFormatter formats the loggable into a formatted string', () => {
    const expected = '[NOTICE] [foo] [2020-01-01T13:00:00.000Z] -- hello world';
    expect(standardFormatter(loggable)).toEqual(expected);
  });
});
