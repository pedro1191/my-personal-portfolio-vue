import { Theme } from '@/constants';
import { onBeforeUnmount, ref } from 'vue';

export function useSystemColorScheme() {
  const theme = ref(null);

  function onDarkThemeChange(e) {
    if (e.matches) {
      theme.value = Theme.Dark;
    }
  }

  function onLightThemeChange(e) {
    if (e.matches) {
      theme.value = Theme.Light;
    }
  }

  window
    .matchMedia('(prefers-color-scheme: dark)')
    .addEventListener('change', onDarkThemeChange);
  window
    .matchMedia('(prefers-color-scheme: light)')
    .addEventListener('change', onLightThemeChange);

  onBeforeUnmount(() => {
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .removeEventListener('change', onDarkThemeChange);
    window
      .matchMedia('(prefers-color-scheme: light)')
      .removeEventListener('change', onLightThemeChange);
  });

  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    onDarkThemeChange({ matches: true });
  }
  if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    onLightThemeChange({ matches: true });
  }

  return {
    theme,
  };
}
