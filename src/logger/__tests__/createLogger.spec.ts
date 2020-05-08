import {createLogger} from '../createLogger';
import {createMockEventEmitter} from '../__mocks__/createMockEventEmitter';

describe('Test suite for createLogger', () => {
  test('createLogger returns a function that returns a log channel', () => {
    const channel = createLogger(createMockEventEmitter())();

    expect(channel.debug).toBeTruthy();
    expect(channel.info).toBeTruthy();
    expect(channel.notice).toBeTruthy();
    expect(channel.warning).toBeTruthy();
    expect(channel.error).toBeTruthy();
    expect(channel.critical).toBeTruthy();
  });
});
