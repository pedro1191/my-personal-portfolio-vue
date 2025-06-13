import { ref, onBeforeUnmount } from 'vue';

export function useCursorHighlighter() {
  const circleRadius = 450;
  const styles = ref({});

  function onMouseMove(e) {
    const x = e.clientX;
    const y = e.clientY;
    const gradient = `radial-gradient(${circleRadius}px at ${x}px ${y}px, var(--background-color-cursor), transparent 80%)`;

    styles.value = {
      backgroundImage: gradient,
    };
  }

  window.addEventListener('mousemove', onMouseMove);

  onBeforeUnmount(() => {
    window.removeEventListener('mousemove', onMouseMove);
  });

  return {
    styles,
  };
}
