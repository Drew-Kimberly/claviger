import {ILoggable, LogChannelHandler, LogEvents, LogSeverity} from '../types';
import {logWithEvent} from '../logWithEvent';
import {createMockEventEmitter} from '../__mocks__/createMockEventEmitter';

describe('Test suite for logWithEvent', () => {
  const message = 'hello world';
  const loggable: ILoggable = {
    severity: LogSeverity.NOTICE,
    channel: 'foo',
    timestamp: 123,
    message: '',
    context: [],
  };
  const handler: LogChannelHandler = (msg, ...context) => ({
    ...loggable,
    message: 'hello world',
  });
  const createEmit = assertion => (e, loggable) => assertion(e, loggable);

  test('logWithEvent returns a log fn that calls the provided logChannelHandler fn', () => {
    const mockHandler = jest.fn(handler);
    logWithEvent(mockHandler, createMockEventEmitter())(message);
    expect(mockHandler).toHaveBeenCalledTimes(1);
  });

  test('logWithEvent returns the logged loggable instance', () => {
    const expected: ILoggable = {...loggable, message: message};
    expect(logWithEvent(handler, createMockEventEmitter())(message)).toEqual(
      expected
    );
  });

  test('logWithEvent emits a MESSAGE_LOGGED event with the loggable instance context', () => {
    const expected: ILoggable = {...loggable, message: message};
    const assertion = (e: LogEvents, context: ILoggable) => {
      expect(e).toEqual(LogEvents.MESSAGE_LOGGED);
      expect(context).toEqual(expected);
    };

    logWithEvent(
      handler,
      createMockEventEmitter(createEmit(assertion))
    )(message);
  });
});
