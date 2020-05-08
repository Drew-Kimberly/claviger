import {ILoggable, LogChannelName, LogSeverity} from '../types';
import {createLoggable} from '../createLoggable';

describe('Test suite for createLoggable', () => {
  const channelName: LogChannelName = 'foo';
  const message = 'hello world';
  const severity: LogSeverity = LogSeverity.ERROR;
  const context = [{foo: 1}];
  const dateNowFn = Date.now;
  const NOW = 1577883600000;

  beforeEach(() => (Date.now = jest.fn(() => NOW)));
  afterEach(() => (Date.now = dateNowFn));

  test('createLoggable returns a an ILoggable object', () => {
    const expected: ILoggable = {
      severity: LogSeverity.ERROR,
      channel: channelName,
      timestamp: NOW,
      message: message,
      context: context,
    };

    expect(createLoggable(severity, channelName, message, context)).toEqual(
      expected
    );
  });
});
