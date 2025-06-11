import { useSystemColorScheme } from '@/composables';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Theme } from '@/constants';
import { withSetup } from '../test-utils';

describe('systemColorScheme', () => {
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('gets null when there is no preferred color scheme', () => {
    // ARRANGE
    window.matchMedia = vi.fn().mockImplementation(() => ({
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    // ACT
    const [result] = withSetup(() => useSystemColorScheme());

    // ASSERT
    expect(result.theme.value).toBeNull();
  });

  it('gets dark when dark is the preferred color scheme', () => {
    // ARRANGE
    window.matchMedia = vi.fn().mockImplementation((media) => ({
      addEventListener: vi.fn().mockImplementation(),
      removeEventListener: vi.fn(),
      matches: media === '(prefers-color-scheme: dark)',
    }));

    // ACT
    const [result] = withSetup(() => useSystemColorScheme());

    // ASSERT
    expect(result.theme.value).toBe(Theme.Dark);
  });

  it('gets light when light is the preferred color scheme', () => {
    // ARRANGE
    window.matchMedia = vi.fn().mockImplementation((media) => ({
      addEventListener: vi.fn().mockImplementation(),
      removeEventListener: vi.fn(),
      matches: media === '(prefers-color-scheme: light)',
    }));

    // ACT
    const [result] = withSetup(() => useSystemColorScheme());

    // ASSERT
    expect(result.theme.value).toBe(Theme.Light);
  });
});
