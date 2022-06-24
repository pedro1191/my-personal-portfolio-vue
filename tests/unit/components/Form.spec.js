import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import Form from '@/components/Form.vue';

describe('Form.vue', () => {
  it('renders props.formGroups when passed', () => {
    // ARRANGE
    const formGroups = {
      textarea: {
        description: faker.lorem.words(),
        disabled: faker.datatype.boolean(),
        label: faker.lorem.words(),
        type: 'textarea',
        validationMessage: faker.lorem.sentence(),
        value: faker.lorem.words(),
      },
      input: {
        description: faker.lorem.words(),
        disabled: faker.datatype.boolean(),
        label: faker.lorem.words(),
        type: undefined,
        validationMessage: faker.lorem.sentence(),
        value: faker.lorem.words(),
      },
      submit: {
        description: faker.lorem.words(),
        disabled: faker.datatype.boolean(),
        label: faker.lorem.words(),
        type: 'submit',
        validationMessage: faker.lorem.sentence(),
        value: faker.lorem.words(),
      },
    };
    const wrapper = mount(Form, {
      props: { formGroups },
    });

    // ACT
    const formGroupLabel = wrapper.findAll('label');
    const formGroupValidationMessage = wrapper.findAll('.invalid-feedback');
    const formGroupTextArea = wrapper.get('textarea');
    const formGroupText = wrapper.get('input');
    const formGroupSubmit = wrapper.get('button');
    formGroups.textarea.element = formGroupTextArea;
    formGroups.input.element = formGroupText;
    formGroups.submit.element = formGroupSubmit;

    // ASSERT
    let i = 0;
    for (let key in formGroups) {
      expect(formGroupLabel[i].text()).toBe(formGroups[key].label);
      if (key === 'submit') {
        expect(formGroups[key].element.text()).toBe(
          formGroups[key].description
        );
      } else {
        expect(formGroups[key].element.attributes('placeholder')).toBe(
          formGroups[key].description
        );
      }
      if (formGroups[key].disabled) {
        expect(formGroups[key].element.attributes('disabled')).toBeDefined();
      } else {
        expect(formGroups[key].element.attributes('disabled')).toBeUndefined();
      }
      expect(formGroupValidationMessage[i].text()).toBe(
        formGroups[key].validationMessage
      );
      i++;
    }
  });

  it('emits the formGroupTouched event', async () => {
    // ARRANGE
    const formGroups = {
      textarea: {
        description: faker.lorem.words(),
        disabled: false,
        label: faker.lorem.words(),
        type: 'textarea',
        validationMessage: faker.lorem.sentence(),
        value: faker.lorem.words(),
      },
      input: {
        description: faker.lorem.words(),
        disabled: false,
        label: faker.lorem.words(),
        type: undefined,
        validationMessage: faker.lorem.sentence(),
        value: faker.lorem.words(),
      },
    };
    const wrapper = mount(Form, {
      props: { formGroups },
    });

    // ACT
    const formGroupInputs = wrapper.findAll('.form-control');

    // ASSERT
    let i = 0;
    for (let key in formGroups) {
      await formGroupInputs[i].trigger('input');
      expect(wrapper.emitted().formGroupTouched[i][0]).toBe(key);
      i++;
    }
  });

  it('emits the formSubmited event', async () => {
    // ARRANGE
    const formGroups = {
      submit: {
        description: faker.lorem.words(),
        disabled: false,
        label: faker.lorem.words(),
        type: 'submit',
        validationMessage: faker.lorem.sentence(),
        value: faker.lorem.words(),
      },
    };
    const wrapper = mount(Form, {
      props: { formGroups },
    });

    // ACT
    const formGroupInput = wrapper.get('button');
    await formGroupInput.trigger('click');

    // ASSERT
    expect(wrapper.emitted().formSubmited).toBeTruthy();
  });
});
