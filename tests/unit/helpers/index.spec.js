import { getRandomBackgroundColor } from '@/helpers';

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
});
