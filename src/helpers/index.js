import { Theme } from '@/constants';

export const isValidTheme = (theme) => {
  return Object.values(Theme).includes(theme);
};
