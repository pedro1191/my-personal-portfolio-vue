import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import FormGroup from '@/components/FormGroup.vue';

describe('FormGroup.vue', () => {
  it('renders props when passed for textarea input', () => {
    // ARRANGE
    const formGroup = {
      description: faker.lorem.words(),
      disabled: faker.datatype.boolean(),
      label: faker.lorem.words(),
      type: 'textarea',
      validationMessage: faker.lorem.sentence(),
      value: faker.lorem.words(),
    };
    const formGroupKey = faker.lorem.word();
    const wrapper = mount(FormGroup, {
      props: { formGroup, formGroupKey },
    });

    // ACT
    const formGroupLabel = wrapper.get('label');
    const formGroupInput = wrapper.get('textarea');
    const formGroupValidationMessage = wrapper.get('.invalid-feedback');

    // ASSERT
    expect(formGroupLabel.text()).toBe(formGroup.label);
    expect(formGroupInput.attributes('placeholder')).toBe(
      formGroup.description,
    );
    if (formGroup.disabled) {
      expect(formGroupInput.attributes('disabled')).toBeDefined();
    } else {
      expect(formGroupInput.attributes('disabled')).toBeUndefined();
    }
    expect(formGroupValidationMessage.text()).toBe(formGroup.validationMessage);
  });

  it('renders props when passed for text input', () => {
    // ARRANGE
    const formGroup = {
      description: faker.lorem.words(),
      disabled: faker.datatype.boolean(),
      label: faker.lorem.words(),
      type: undefined,
      validationMessage: faker.lorem.sentence(),
      value: faker.lorem.words(),
    };
    const formGroupKey = faker.lorem.word();
    const wrapper = mount(FormGroup, {
      props: { formGroup, formGroupKey },
    });

    // ACT
    const formGroupLabel = wrapper.get('label');
    const formGroupInput = wrapper.get('input');
    const formGroupValidationMessage = wrapper.get('.invalid-feedback');

    // ASSERT
    expect(formGroupLabel.text()).toBe(formGroup.label);
    expect(formGroupInput.attributes('placeholder')).toBe(
      formGroup.description,
    );
    if (formGroup.disabled) {
      expect(formGroupInput.attributes('disabled')).toBeDefined();
    } else {
      expect(formGroupInput.attributes('disabled')).toBeUndefined();
    }
    expect(formGroupValidationMessage.text()).toBe(formGroup.validationMessage);
  });

  it('renders props when passed for submit input', () => {
    // ARRANGE
    const formGroup = {
      description: faker.lorem.words(),
      disabled: faker.datatype.boolean(),
      label: faker.lorem.words(),
      type: 'submit',
      validationMessage: faker.lorem.sentence(),
      value: faker.lorem.words(),
    };
    const formGroupKey = faker.lorem.word();
    const wrapper = mount(FormGroup, {
      props: { formGroup, formGroupKey },
    });

    // ACT
    const formGroupLabel = wrapper.get('label');
    const formGroupInput = wrapper.get('button');
    const formGroupValidationMessage = wrapper.get('.invalid-feedback');

    // ASSERT
    expect(formGroupLabel.text()).toBe(formGroup.label);
    expect(formGroupInput.text()).toBe(formGroup.description);
    if (formGroup.disabled) {
      expect(formGroupInput.attributes('disabled')).toBeDefined();
    } else {
      expect(formGroupInput.attributes('disabled')).toBeUndefined();
    }
    expect(formGroupValidationMessage.text()).toBe(formGroup.validationMessage);
  });

  it('emits the formGroupTouched event', async () => {
    // ARRANGE
    const formGroup = {
      description: faker.lorem.words(),
      disabled: false,
      label: faker.lorem.words(),
      type: faker.helpers.shuffle(['textarea', undefined])[0],
      validationMessage: faker.lorem.sentence(),
      value: faker.lorem.words(),
    };
    const formGroupKey = faker.lorem.word();
    const wrapper = mount(FormGroup, {
      props: { formGroup, formGroupKey },
    });

    // ACT
    const formGroupInput = wrapper.get('.form-control');
    await formGroupInput.trigger('input');

    // ASSERT
    expect(wrapper.emitted().formGroupTouched[0][0]).toBe(formGroupKey);
  });

  it('emits the formSubmited event', async () => {
    // ARRANGE
    const formGroup = {
      description: faker.lorem.words(),
      disabled: false,
      label: faker.lorem.words(),
      type: 'submit',
      validationMessage: faker.lorem.sentence(),
      value: faker.lorem.words(),
    };
    const formGroupKey = faker.lorem.word();
    const wrapper = mount(FormGroup, {
      props: { formGroup, formGroupKey },
    });

    // ACT
    const formGroupInput = wrapper.get('button');
    await formGroupInput.trigger('click');

    // ASSERT
    expect(wrapper.emitted().formSubmited).toBeTruthy();
  });
});
