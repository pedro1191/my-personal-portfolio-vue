<template>
  <div class="form-group">
    <label
      class="label"
      :class="{
        'show-label': mutableFormGroup.value,
        'text-danger': mutableFormGroup.validationMessage,
      }"
      v-if="mutableFormGroup.label"
    >
      {{ mutableFormGroup.label }}
    </label>

    <textarea
      class="form-control form-control-lg"
      rows="5"
      v-model.trim="mutableFormGroup.value"
      @input="setValue($event.target.value)"
      :disabled="mutableFormGroup.disabled"
      :placeholder="mutableFormGroup.description"
      :class="{ 'is-invalid': mutableFormGroup.validationMessage }"
      v-if="mutableFormGroup.type === 'textarea'"
    >
    </textarea>
    <button
      class="btn btn-info btn-lg"
      type="submit"
      :disabled="mutableFormGroup.disabled"
      @click.prevent="$emit('formSubmited')"
      v-else-if="mutableFormGroup.type === 'submit'"
    >
      {{ mutableFormGroup.description }}
    </button>
    <input
      class="form-control form-control-lg"
      type="text"
      v-model.trim="mutableFormGroup.value"
      @input="setValue($event.target.value)"
      :placeholder="mutableFormGroup.description"
      :disabled="mutableFormGroup.disabled"
      :class="{ 'is-invalid': mutableFormGroup.validationMessage }"
      v-else
    />

    <div class="invalid-feedback" v-if="mutableFormGroup.validationMessage">
      {{ mutableFormGroup.validationMessage }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppFormGroup',
  props: {
    formGroup: {
      type: Object,
      required: true,
    },
    formGroupKey: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      mutableFormGroup: this.formGroup,
    };
  },
  methods: {
    setValue(value) {
      this.mutableFormGroup.value = value;
      this.$emit('formGroupTouched', this.formGroupKey);
    },
  },
};
</script>

<style scoped>
.label {
  margin: 0;
  padding: 0 0 0 0.5rem;
  color: #17a2b8;
  opacity: 0;
  top: 35px;
  transition:
    opacity 0.25s,
    top 0.25s;
  position: relative;
}

.show-label {
  opacity: 1;
  top: 0;
}
</style>
