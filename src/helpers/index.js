import { Theme } from '@/constants';

export const getRandomBackgroundColor = (min = 100000, max = 999999) => {
  const minValue = Math.ceil(min);
  const maxValue = Math.floor(max);
  const hexColor = `#${
    Math.floor(Math.random() * (maxValue - minValue)) + minValue
  }`;
  return hexColor;
};

export const isValidTheme = (theme) => {
  return Object.values(Theme).includes(theme);
};
