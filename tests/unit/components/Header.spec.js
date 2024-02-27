import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Header from '@/components/Header.vue';

describe('Header.vue', () => {
  it('renders props.customStyle when passed', () => {
    // ARRANGE
    const colorFormat = { format: 'css' };
    const customStyle = {
      color: faker.color.rgb(colorFormat),
    };
    const wrapper = mount(Header, {
      props: { customStyle },
    });

    // ACT
    const wrapperStyle = wrapper.attributes('style');

    // ASSERT
    expect(wrapperStyle).toBe(`color: ${customStyle.color};`);
  });

  it('renders the default slot content', () => {
    // ARRANGE
    const content = faker.lorem.words();
    const wrapper = mount(Header, {
      slots: {
        default: content,
      },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toBe(content);
  });
});
