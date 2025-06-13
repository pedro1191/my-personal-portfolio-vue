<template>
  <div class="theme-toggle" :class="`theme-toggle-${theme}`">
    <button
      :title="`Switch to ${inverseThemeEnum[theme]} theme`"
      @click="$emit('toggleTheme')"
    >
      <SunBright v-if="theme === themeEnum.Dark" />
      <font-awesome-icon
        v-if="theme === themeEnum.Light"
        icon="fa-regular fa-moon"
      />
    </button>
  </div>
</template>

<script>
import SunBright from '@/components/SunBright.vue';
import { InverseTheme, Theme } from '@/constants';
import { isValidTheme } from '@/helpers';

export default {
  name: 'AppThemeToggle',
  components: {
    SunBright,
  },
  props: {
    theme: {
      type: String,
      required: true,
      validator(value) {
        return isValidTheme(value);
      },
    },
  },
  data() {
    return {
      themeEnum: Theme,
      inverseThemeEnum: InverseTheme,
    };
  },
};
</script>

<style scoped>
.theme-toggle button {
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-color);
  background-color: transparent;
  width: 42px;
  height: 42px;
  border-radius: 50%;
  opacity: 0.8;
}

.theme-toggle button:hover,
.theme-toggle button:focus,
.theme-toggle button:focus,
.theme-toggle button:focus-within {
  opacity: 1;
  background: hsl(0 0% 50% / 0.15);
}

.theme-toggle svg {
  height: 16px;
  fill: var(--text-color);
}
</style>
