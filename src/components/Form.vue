<template>
  <form class="form" novalidate="novalidate">
    <app-form-group v-for="(formGroup, index) in formGroups" :key="index" :formGroup="formGroup" @formSubmited="$emit('formSubmited')" />
  </form>
</template>

<script>
import FormGroup from './FormGroup.vue';

export default {
  props: {
    formGroups: {
      type: Object,
      required: true
    }
  },
  components: {
    appFormGroup: FormGroup
  }
};
</script>

<style scoped>
.form {
  text-align: left;
}
</style>

