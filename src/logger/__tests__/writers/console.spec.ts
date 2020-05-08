import {consoleWriter} from '../../writers';
import {ILoggable, LogSeverity} from '../../types';
import {asIsFormatter} from '../../formatters';

describe('Test suite for consoleWriter', () => {
  const consoleLogFn = console.log;
  const loggable: ILoggable = {
    severity: LogSeverity.INFO,
    channel: '',
    timestamp: 0,
    message: 'hello world',
    context: [],
  };

  beforeEach(() => (console.log = jest.fn()));
  afterEach(() => (console.log = consoleLogFn));

  test('consoleWriter has a side effect which calls console.log', async () => {
    jest.spyOn(global.console, 'log');
    await consoleWriter(loggable, asIsFormatter);
    expect(console.log).toHaveBeenCalled();
  });
});
