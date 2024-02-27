import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Divider from '@/components/Divider.vue';

describe('Divider.vue', () => {
  it('renders props.customStyle when passed', () => {
    // ARRANGE
    const colorFormat = { format: 'css' };
    const customStyle = {
      color: faker.color.rgb(colorFormat),
    };
    const wrapper = mount(Divider, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { customStyle },
    });

    // ACT
    const wrapperStyle = wrapper.attributes('style');

    // ASSERT
    expect(wrapperStyle).toBe(`color: ${customStyle.color};`);
  });
});
