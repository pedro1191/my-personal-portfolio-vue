import { ref } from 'vue';
import { USER_THEME_KEY } from '@/constants';
import { isValidTheme } from '@/helpers';

export function useUserColorScheme() {
  const theme = ref(null);
  const currentUserTheme = localStorage.getItem(USER_THEME_KEY);

  function setTheme(newTheme) {
    if (isValidTheme(newTheme)) {
      theme.value = newTheme;
      localStorage.setItem(USER_THEME_KEY, newTheme);
    }
  }

  if (currentUserTheme) {
    setTheme(currentUserTheme);
  }

  return {
    theme,
    setTheme,
  };
}
