import {ILoggable, LogChannelName, LogSeverity} from '../types';
import {createLogChannel} from '../createLogChannel';

describe('Test suite for createLogChannel', () => {
  const channelName: LogChannelName = 'foo';
  const message = 'hello world';
  const dateNowFn = Date.now;
  const NOW = 1577883600000;

  beforeEach(() => (Date.now = jest.fn(() => NOW)));
  afterEach(() => (Date.now = dateNowFn));

  test('createLogChannel creates a channel that can create debug loggables', () => {
    const channel = createLogChannel(channelName);

    const expected: ILoggable<LogSeverity.DEBUG> = {
      severity: LogSeverity.DEBUG,
      channel: channelName,
      timestamp: NOW,
      message: message,
      context: [],
    };

    expect(channel.debug(message)).toEqual(expected);
  });

  test('createLogChannel creates a channel that can create info loggables', () => {
    const channel = createLogChannel(channelName);

    const expected: ILoggable<LogSeverity.INFO> = {
      severity: LogSeverity.INFO,
      channel: channelName,
      timestamp: NOW,
      message: message,
      context: [],
    };

    expect(channel.info(message)).toEqual(expected);
  });

  test('createLogChannel creates a channel that can create notice loggables', () => {
    const channel = createLogChannel(channelName);

    const expected: ILoggable<LogSeverity.NOTICE> = {
      severity: LogSeverity.NOTICE,
      channel: channelName,
      timestamp: NOW,
      message: message,
      context: [],
    };

    expect(channel.notice(message)).toEqual(expected);
  });

  test('createLogChannel creates a channel that can create warning loggables', () => {
    const channel = createLogChannel(channelName);

    const expected: ILoggable<LogSeverity.WARNING> = {
      severity: LogSeverity.WARNING,
      channel: channelName,
      timestamp: NOW,
      message: message,
      context: [],
    };

    expect(channel.warning(message)).toEqual(expected);
  });

  test('createLogChannel creates a channel that can create error loggables', () => {
    const channel = createLogChannel(channelName);

    const expected: ILoggable<LogSeverity.ERROR> = {
      severity: LogSeverity.ERROR,
      channel: channelName,
      timestamp: NOW,
      message: message,
      context: [],
    };

    expect(channel.error(message)).toEqual(expected);
  });

  test('createLogChannel creates a channel that can create critical loggables', () => {
    const channel = createLogChannel(channelName);

    const expected: ILoggable<LogSeverity.CRITICAL> = {
      severity: LogSeverity.CRITICAL,
      channel: channelName,
      timestamp: NOW,
      message: message,
      context: [],
    };

    expect(channel.critical(message)).toEqual(expected);
  });
});
