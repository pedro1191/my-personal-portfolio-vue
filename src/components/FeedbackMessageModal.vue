<template>
  <Backdrop @maskClick="emitClose">
    <ZoomAnimation>
      <Modal
        v-if="show"
        :customContentStyle="customContentStyle"
        @close="emitClose"
      >
        <template v-slot:body>
          <slot></slot>
        </template>
        <template v-slot:footer>
          <button title="Close" class="btn btn-info" @click="emitClose">
            Ok
          </button>
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
  name: 'AppFeedbackMessage',
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
