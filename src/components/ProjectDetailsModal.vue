<template>
  <Backdrop @maskClick="emitClose">
    <ZoomAnimation>
      <Modal
        v-if="show"
        :customContentStyle="customContentStyle"
        @close="emitClose"
      >
        <template v-slot:header>
          <div class="close-button">
            <button title="Close" @click="emitClose">
              <font-awesome-icon class="ml-2" icon="fa-times" size="3x" />
            </button>
          </div>
        </template>
        <template v-slot:body>
          <slot></slot>
        </template>
      </Modal>
    </ZoomAnimation>
  </Backdrop>
</template>

<script>
import modalMixin from '@/mixins/modal';
import Backdrop from '@/components/Backdrop.vue';
import Modal from '@/components/Modal.vue';
import ZoomAnimation from '@/components/ZoomAnimation.vue';

export default {
  name: 'AppProjectDetails',
  components: {
    Backdrop,
    Modal,
    ZoomAnimation,
  },
  mixins: [modalMixin],
  props: {
    customContentStyle: Object,
  },
};
</script>

<style scoped>
.close-button {
  padding: 0;
  width: 100%;
  text-align: right;
}

.close-button button {
  border: none;
  outline: none;
  background-color: transparent;
  color: #17a2b8;
  display: inline-flex;
  align-items: center;
}

.close-button button:hover,
.close-button button:focus {
  color: #117a8b;
}
</style>
