import { useUserColorScheme } from '@/composables';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InverseTheme, Theme, USER_THEME_KEY } from '@/constants';

describe('userColorScheme', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('gets null when there is no preferred color scheme', () => {
    // ARRANGE
    localStorage.setItem(USER_THEME_KEY, null);

    // ACT
    const { theme } = useUserColorScheme();

    // ASSERT
    expect(theme.value).toBeNull();
  });

  it('gets dark when dark is the preferred color scheme', () => {
    // ARRANGE
    localStorage.setItem(USER_THEME_KEY, Theme.Dark);

    // ACT
    const { theme } = useUserColorScheme();

    // ASSERT
    expect(theme.value).toBe(Theme.Dark);
  });

  it('gets light when light is the preferred color scheme', () => {
    // ARRANGE
    localStorage.setItem(USER_THEME_KEY, Theme.Light);

    // ACT
    const { theme } = useUserColorScheme();

    // ASSERT
    expect(theme.value).toBe(Theme.Light);
  });

  it('changes the preferred color scheme', () => {
    // ARRANGE
    const previousUserTheme = Theme.Light;
    const newUserTheme = InverseTheme[previousUserTheme];
    localStorage.setItem(USER_THEME_KEY, previousUserTheme);

    // ACT
    const { theme, setTheme } = useUserColorScheme();
    setTheme(newUserTheme);

    // ASSERT
    expect(theme.value).toBe(newUserTheme);
  });
});
