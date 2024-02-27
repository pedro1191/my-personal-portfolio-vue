import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Backdrop from '@/components/Backdrop.vue';

describe('Backdrop.vue', () => {
  it('renders a Backdrop', () => {
    // ARRANGE
    const defaultContent = faker.lorem.words();
    const wrapper = mount(Backdrop, {
      slots: {
        default: defaultContent,
      },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toBe(defaultContent);
  });

  it('emits the maskClick event when the mask is clicked', async () => {
    // ARRANGE
    const wrapper = mount(Backdrop);

    // ACT
    await wrapper.get('[class="modal-mask"]').trigger('click');

    // ASSERT
    expect(wrapper.emitted().maskClick).toBeTruthy();
  });
});
