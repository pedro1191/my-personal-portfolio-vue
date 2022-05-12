<template>
  <form class="form" novalidate="novalidate">
    <FormGroup
      v-for="(formGroup, key, index) in formGroups"
      :key="index"
      :formGroup="formGroup"
      :formGroupKey="key"
      @formSubmited="$emit('formSubmited')"
      @formGroupTouched="$emit('formGroupTouched', $event)"
    />
  </form>
</template>

<script>
import FormGroup from './FormGroup.vue';

export default {
  name: 'AppForm',
  components: {
    FormGroup,
  },
  props: {
    formGroups: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
.form {
  text-align: left;
}
</style>
