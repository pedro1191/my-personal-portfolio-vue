import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { Theme } from '@/constants';
import { isValidTheme } from '@/helpers';

describe('getRandomBackgroundColor', () => {
  it('validates the themes', () => {
    // ARRANGE
    const darkTheme = Theme.Dark;
    const lightTheme = Theme.Light;

    // ACT
    const isDarkThemeValid = isValidTheme(darkTheme);
    const isLightThemeValid = isValidTheme(lightTheme);

    // ASSERT
    expect(isDarkThemeValid).toBeTruthy();
    expect(isLightThemeValid).toBeTruthy();
  });

  it('invalidates the theme', () => {
    // ARRANGE
    const invalidTheme = faker.string.alphanumeric();

    // ACT
    const isInvalidTheme = isValidTheme(invalidTheme);

    // ASSERT
    expect(isInvalidTheme).toBeFalsy();
  });
});
