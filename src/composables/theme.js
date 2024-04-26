import { computed, watch } from 'vue';
import { useUserColorScheme } from './userColorScheme';
import { useSystemColorScheme } from './systemColorScheme';
import { InverseTheme, Theme } from '@/constants';

export function useTheme() {
  const { theme: systemTheme } = useSystemColorScheme();
  const { theme: userTheme, setTheme } = useUserColorScheme();
  const theme = computed(
    () => userTheme.value ?? systemTheme.value ?? Theme.Default,
  );
  watch(
    theme,
    (newTheme) => {
      document.documentElement.dataset.theme = newTheme;
    },
    { immediate: true },
  );

  function toggleTheme() {
    setTheme(InverseTheme[theme.value]);
  }

  return {
    theme,
    toggleTheme,
  };
}
