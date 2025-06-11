import { ref } from 'vue';
import { Theme } from '@/constants';

export function useTheme() {
  const theme = ref(Theme.Default);

  function toggleTheme() {}

  return {
    theme,
    toggleTheme,
  };
}
