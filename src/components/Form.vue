<template>
  <form class="form" novalidate="novalidate">
    <app-form-group v-for="(formGroup, key, index) in formGroups" :key="index" :formGroup="formGroup" :formGroupKey="key" @formSubmited="$emit('formSubmited')" @formGroupTouched="$emit('formGroupTouched', $event)" />
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

