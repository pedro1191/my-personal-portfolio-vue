import { faker } from '@faker-js/faker';
import { describe, expect, it } from 'vitest';
import { Theme } from '@/constants';
import { getRandomBackgroundColor, isValidTheme } from '@/helpers';

describe('getRandomBackgroundColor', () => {
  it('generates a random hex color', () => {
    // ARRANGE
    const minValue = 100000;
    const maxValue = 999999;

    // ACT
    const hexColor = getRandomBackgroundColor(minValue, maxValue);
    const hexColorNumber = parseInt(hexColor.replace(/[^\d]/, ''));

    // ASSERT
    expect(hexColor).toBe(`#${hexColorNumber}`);
    expect(hexColorNumber).toBeGreaterThanOrEqual(minValue);
    expect(hexColorNumber).toBeLessThanOrEqual(maxValue);
  });

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
