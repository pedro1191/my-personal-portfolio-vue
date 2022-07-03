export const TIMEOUT_MS = 250;

export default {
  data() {
    return {
      show: false,
    };
  },
  mounted() {
    this.show = true;
  },
  methods: {
    emitClose() {
      this.show = false;
      setTimeout(() => {
        this.$emit('close');
      }, TIMEOUT_MS);
    },
  },
};
