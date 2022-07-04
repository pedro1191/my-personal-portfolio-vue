<template>
  <div class="modal-wrapper">
    <div id="modal-container" class="modal-container">
      <div class="modal-content" :style="customContentStyle">
        <div class="modal-header">
          <slot name="header"></slot>
        </div>

        <div class="modal-body">
          <slot name="body"></slot>
        </div>

        <div class="modal-footer">
          <slot name="footer"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppModal',
  props: {
    customContentStyle: Object,
  },
};
</script>

<style scoped>
.modal-wrapper {
  z-index: 9999;
  display: inline-flex;
  min-height: 100%;
  padding: 0;
  margin: 0;
  background-color: transparent;
  max-width: 900px;
}

.modal-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100%;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.modal-header:empty,
.modal-footer:empty {
  display: none;
}
</style>
