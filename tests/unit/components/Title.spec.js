import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Title from '@/components/Title.vue';

describe('Title.vue', () => {
  it('renders props.title when passed', () => {
    // ARRANGE
    const title = faker.lorem.words();
    const wrapper = mount(Title, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { title },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toMatch(title);
  });

  it('renders an h1 when isSecondary is false', () => {
    // ARRANGE
    const title = faker.lorem.words();
    const wrapper = mount(Title, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { title, isSecondary: false },
    });

    // ACT
    const h1Element = wrapper.find('h1');
    const h2Element = wrapper.find('h2');

    // ASSERT
    expect(h1Element.exists()).toBe(true);
    expect(h2Element.exists()).toBe(false);
  });

  it('renders an h2 when isSecondary is true', () => {
    // ARRANGE
    const title = faker.lorem.words();
    const wrapper = mount(Title, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { title, isSecondary: true },
    });

    // ACT
    const h1Element = wrapper.find('h1');
    const h2Element = wrapper.find('h2');

    // ASSERT
    expect(h1Element.exists()).toBe(false);
    expect(h2Element.exists()).toBe(true);
  });
});
