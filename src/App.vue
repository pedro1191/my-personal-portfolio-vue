<template>
  <GlobalLayout />
</template>

<script>
import GlobalLayout from '@/views/GlobalLayout.vue';

export default {
  components: {
    GlobalLayout,
  },
};
</script>

<style>
@font-face {
  font-family: 'Roboto';
  src: url('./assets/fonts/Roboto-Regular.ttf');
}

:root {
  --navbar-height: 106px;
  --transition-fast: 0.25s;
  --border-radius: 0.25rem;
  --border-width-thick: 0.25rem;
}

:root[data-theme='light'] {
  --background-color: #e0e7eb;
  --border-color: rgba(0, 0, 0, 0.1);
  --text-color: #030607;

  --text: #030607;
  --text5: hsl(195, 40%, 2%, 5%);
  --inverse-text: #f8fbfc;
  --background: #e0e7eb;
  --primary: #17a4ba;
  --primary5: hsl(188, 78%, 59%, 5%);
  --secondary: #90c9e9;
  --secondary20: hsl(202, 67%, 74%, 20%);
  --accent: #2b3d50;
  --background-with-transparency: rgba(224, 231, 235, 0.85);
}

:root[data-theme='dark'] {
  --background-color: #141b1f;
  --border-color: rgba(255, 255, 255, 0.1);
  --text-color: #f8fbfc;

  --inverse-text: #030607;
  --text: #f8fbfc;
  --text5: hsl(195, 40%, 98%, 5%);
  --background: #141b1f;
  --primary: #45d2e8;
  --primary5: hsl(188, 78%, 41%, 5%);
  --secondary: #164e6f;
  --secondary20: hsl(202, 67%, 26%, 20%);
  --accent: #afc1d4;
  --background-with-transparency: rgba(20, 27, 31, 0.85);
}

:root[data-theme='light'] {
  --text-50: #eef2f6;
  --text-100: #dee5ed;
  --text-200: #bdcbdb;
  --text-300: #9cb2c9;
  --text-400: #7a98b8;
  --text-500: #597ea6;
  --text-600: #476585;
  --text-700: #364c63;
  --text-800: #243242;
  --text-900: #121921;
  --text-950: #090d11;

  --background-50: #f0f3f5;
  --background-100: #e0e7eb;
  --background-200: #c2cfd6;
  --background-300: #a3b8c2;
  --background-400: #85a0ad;
  --background-500: #668899;
  --background-600: #526d7a;
  --background-700: #3d525c;
  --background-800: #29363d;
  --background-900: #141b1f;
  --background-950: #0a0e0f;

  --primary-50: #e8fafc;
  --primary-100: #d2f4f9;
  --primary-200: #a4e9f4;
  --primary-300: #77deee;
  --primary-400: #49d3e9;
  --primary-500: #1cc8e3;
  --primary-600: #16a0b6;
  --primary-700: #117888;
  --primary-800: #0b505b;
  --primary-900: #06282d;
  --primary-950: #031417;

  --secondary-50: #eff2f6;
  --secondary-100: #dfe5ec;
  --secondary-200: #beccda;
  --secondary-300: #9eb2c7;
  --secondary-400: #7d98b5;
  --secondary-500: #5d7ea2;
  --secondary-600: #4a6582;
  --secondary-700: #384c61;
  --secondary-800: #253341;
  --secondary-900: #131920;
  --secondary-950: #090d10;

  --accent-50: #eef2f6;
  --accent-100: #dee5ed;
  --accent-200: #bdcbdb;
  --accent-300: #9cb2c9;
  --accent-400: #7a98b8;
  --accent-500: #597ea6;
  --accent-600: #476585;
  --accent-700: #364c63;
  --accent-800: #243242;
  --accent-900: #121921;
  --accent-950: #090d11;
}
:root[data-theme='dark'] {
  --text-50: #090d11;
  --text-100: #121921;
  --text-200: #243242;
  --text-300: #364c63;
  --text-400: #476585;
  --text-500: #597ea6;
  --text-600: #7a98b8;
  --text-700: #9cb2c9;
  --text-800: #bdcbdb;
  --text-900: #dee5ed;
  --text-950: #eef2f6;

  --background-50: #0a0e0f;
  --background-100: #141b1f;
  --background-200: #29363d;
  --background-300: #3d525c;
  --background-400: #526d7a;
  --background-500: #668899;
  --background-600: #85a0ad;
  --background-700: #a3b8c2;
  --background-800: #c2cfd6;
  --background-900: #e0e7eb;
  --background-950: #f0f3f5;

  --primary-50: #031417;
  --primary-100: #06282d;
  --primary-200: #0b505b;
  --primary-300: #117888;
  --primary-400: #16a0b6;
  --primary-500: #1cc8e3;
  --primary-600: #49d3e9;
  --primary-700: #77deee;
  --primary-800: #a4e9f4;
  --primary-900: #d2f4f9;
  --primary-950: #e8fafc;

  --secondary-50: #090d10;
  --secondary-100: #131920;
  --secondary-200: #253241;
  --secondary-300: #384b61;
  --secondary-400: #4a6482;
  --secondary-500: #5d7da2;
  --secondary-600: #7d97b5;
  --secondary-700: #9eb1c7;
  --secondary-800: #becbda;
  --secondary-900: #dfe5ec;
  --secondary-950: #eff2f6;

  --accent-50: #090d11;
  --accent-100: #121921;
  --accent-200: #243242;
  --accent-300: #364c63;
  --accent-400: #476585;
  --accent-500: #597ea6;
  --accent-600: #7a98b8;
  --accent-700: #9cb2c9;
  --accent-800: #bdcbdb;
  --accent-900: #dee5ed;
  --accent-950: #eef2f6;
}

html {
  scrollbar-gutter: stable;
}

body {
  color: var(--text-color);
  background-color: var(--background-color);
}

#app {
  font-family: Roboto, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
