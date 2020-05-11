import {createLoggerFactory} from '../createLoggerFactory';
import {
  DEFAULT_LOG_CHANNEL,
  EventListener,
  EventListenerHandler,
  ILoggable,
  LogEvents,
  LogFormatter,
  LogSeverity,
  LogWriter,
} from '../types';
import {createMockEventEmitter} from '../__mocks__/createMockEventEmitter';

describe('Test suite for createLoggerFactory', () => {
  const mockLogWriter: LogWriter = jest.fn(async (loggable, formatter) => {});
  const mockLogFormatter: LogFormatter<void> = jest.fn(loggable => {});

  const createEventListener = (assertion): EventListener => (e, handler) =>
    assertion(e, handler);

  test('createLoggerFactory returns an object with a createLogger method', () => {
    const loggerFactory = createLoggerFactory(mockLogWriter, mockLogFormatter);

    expect(loggerFactory.createLogger).toBeTruthy();
  });

  test('createLoggerFactory uses default writer/formatter functions', () => {
    const loggerFactory = createLoggerFactory();
    expect(loggerFactory.createLogger).toBeTruthy();
  });

  test('createLoggerFactory registers a MESSAGE_LOGGED event listener', () => {
    const assertion: EventListener = (
      e: LogEvents,
      handler: EventListenerHandler
    ) => {
      expect(e).toEqual(LogEvents.MESSAGE_LOGGED);
    };

    createLoggerFactory(
      mockLogWriter,
      mockLogFormatter,
      createMockEventEmitter(() => {}, createEventListener(assertion))
    );
  });

  test('createLoggerFactory registers an event listener with a curried LogWriter handler', () => {
    const loggable: ILoggable = {
      severity: LogSeverity.ERROR,
      channel: DEFAULT_LOG_CHANNEL,
      timestamp: 123,
      message: 'hello',
      context: [],
    };
    const listener: EventListener = (
      e: LogEvents,
      handler: EventListenerHandler
    ) => {
      handler(loggable);
    };

    const loggerFactory = createLoggerFactory(
      mockLogWriter,
      mockLogFormatter,
      createMockEventEmitter(() => {}, createEventListener(listener))
    );

    loggerFactory.createLogger().error('hello');

    expect(mockLogWriter).toHaveBeenCalledTimes(1);
  });
});
