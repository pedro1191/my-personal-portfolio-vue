<template>
  <div class="form-group mb-0 py-2">
    <label class="label" :class="{ 'show-label': formGroup.value, 'text-danger': formGroup.validationMessage }" v-if="formGroup.label">{{ formGroup.label }}</label>

    <textarea class="form-control form-control-lg" rows="5" v-model.trim="formGroup.value" @input="setValue($event.target.value)" :disabled="formGroup.disabled" :placeholder="formGroup.description" :class="{ 'is-invalid': formGroup.validationMessage }" v-if="formGroup.type === 'textarea'"></textarea>
    <button class="btn btn-info btn-lg" type="submit" :disabled="formGroup.disabled" @click.prevent="$emit('formSubmited')" v-else-if="formGroup.type === 'submit'">{{ formGroup.description }}</button>
    <input class="form-control form-control-lg" type="text" v-model.trim="formGroup.value" @input="setValue($event.target.value)" :placeholder="formGroup.description" :disabled="formGroup.disabled" :class="{ 'is-invalid': formGroup.validationMessage }" v-else>

    <div class="invalid-feedback" v-if="formGroup.validationMessage">{{ formGroup.validationMessage }}</div>
  </div>
</template>

<script>
export default {
  props: {
    formGroup: {
      type: Object,
      required: true
    },
    formGroupKey: {
      type: String,
      required: true
    }
  },
  methods: {
    setValue(value) {
      this.formGroup.value = value;
      this.$emit('formGroupTouched', this.formGroupKey);
    }
  }
};
</script>

<style scoped>
.label {
  margin: 0;
  padding: 0 0 0 1rem;
  color: #17a2b8;
  opacity: 0;
}

.show-label {
  opacity: 1;
}
</style>


