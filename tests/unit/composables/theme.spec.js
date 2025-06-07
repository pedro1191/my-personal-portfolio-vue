import { useTheme } from '@/composables';
import { InverseTheme, Theme, USER_THEME_KEY } from '@/constants';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { withSetup } from '../test-utils';
import { nextTick } from 'vue';

describe('theme', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('gets the default theme when there is no preferred color scheme', () => {
    // ARRANGE
    window.matchMedia = vi.fn().mockImplementation(() => ({
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    // ACT
    const [result] = withSetup(() => useTheme());

    // ASSERT
    expect(result.theme.value).toBe(Theme.Default);
    expect(document.documentElement.dataset.theme).toBe(Theme.Default);
  });

  it('favors the user color scheme over the system color scheme', () => {
    // ARRANGE
    localStorage.setItem(USER_THEME_KEY, Theme.Light);
    window.matchMedia = vi.fn().mockImplementation((media) => ({
      addEventListener: vi.fn().mockImplementation(),
      removeEventListener: vi.fn(),
      matches: media === '(prefers-color-scheme: dark)',
    }));

    // ACT
    const [result] = withSetup(() => useTheme());

    // ASSERT
    expect(result.theme.value).toBe(Theme.Light);
    expect(document.documentElement.dataset.theme).toBe(Theme.Light);
  });

  it('toggles the preferred color scheme', async () => {
    // ARRANGE
    window.matchMedia = vi.fn().mockImplementation(() => ({
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }));

    // ACT
    const [result] = withSetup(() => useTheme());
    const previousUserTheme = result.theme.value;
    result.toggleTheme();
    const newUserTheme = InverseTheme[previousUserTheme];
    await nextTick();

    // ASSERT
    expect(result.theme.value).toBe(newUserTheme);
    expect(document.documentElement.dataset.theme).toBe(newUserTheme);
  });
});
