export const Theme = {
  Dark: 'dark',
  Light: 'light',
  Default: 'dark',
};

export const InverseTheme = {
  [Theme.Dark]: Theme.Light,
  [Theme.Light]: Theme.Dark,
};

export const USER_THEME_KEY = 'theme';
