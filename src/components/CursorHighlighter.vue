<template>
  <div class="cursor-highlighter" :style="styles"></div>
</template>

<script>
import { useCursorHighlighter } from '@/composables';

export default {
  name: 'CursorHighlighter',
  setup() {
    const { styles } = useCursorHighlighter();
    return { styles };
  },
};
</script>

<style scoped>
.cursor-highlighter {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 1040;
}
</style>
