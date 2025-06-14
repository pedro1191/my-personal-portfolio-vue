import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useCursorHighlighter } from '@/composables';
import { withSetup } from '../test-utils';

describe('useCursorHighlighter', () => {
  let addEventListenerSpy;

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(window, 'addEventListener');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('registers mousemove event listener on setup', () => {
    // ARRANGE
    const eventType = 'mousemove';

    // ACT
    withSetup(() => useCursorHighlighter());

    // ASSERT
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      eventType,
      expect.any(Function),
    );
  });

  it('updates styles when mouse moves', () => {
    // ARRANGE
    const mockEvent = {
      clientX: 100,
      clientY: 200,
    };
    const expectedGradient = `radial-gradient(450px at 100px 200px, var(--background-color-cursor), transparent 80%)`;

    // ACT
    const [result] = withSetup(() => useCursorHighlighter());
    const listener = addEventListenerSpy.mock.calls.find(
      ([type]) => type === 'mousemove',
    )[1];
    listener(mockEvent);

    // ASSERT
    expect(result.styles.value).toEqual({
      backgroundImage: expectedGradient,
    });
  });
});
