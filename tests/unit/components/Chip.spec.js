import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Chip from '@/components/Chip.vue';

describe('Chip.vue', () => {
  it('renders a chip', () => {
    // ARRANGE
    const label = faker.person.fullName();
    const wrapper = mount(Chip, {
      props: {
        label,
      }
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toBe(label);
  });
});
