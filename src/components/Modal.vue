<template>
  <transition name="modal">
    <div class="modal-mask" @click.self="$emit('maskClick')">
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
    </div>
  </transition>
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
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
  padding: 2.5%;
  margin: 0;
  overflow: auto;
  box-sizing: border-box;
}

.modal-wrapper {
  display: inline-flex;
  min-height: 100%;
  padding: 0;
  margin: 0;
  background-color: transparent;
}

.modal-container {
  z-index: 9999;
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

/*
 * Modal transition
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
