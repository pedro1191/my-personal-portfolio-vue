import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import Section from '@/components/Section.vue';

describe('Section.vue', () => {
  it('renders props.title when passed', () => {
    // ARRANGE
    const title = faker.lorem.words();
    const wrapper = mount(Section, {
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

  it('renders props.customStyle when passed', () => {
    // ARRANGE
    const colorFormat = { format: 'css' };
    const title = faker.lorem.words();
    const customStyle = {
      wrapper: {
        color: faker.color.rgb(colorFormat),
      },
      title: {
        wrapper: {
          color: faker.color.rgb(colorFormat),
        },
      },
    };
    const wrapper = mount(Section, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: {
        title,
        customStyle,
      },
    });

    // ACT
    const titleWrapper = wrapper.get('[data-test="title-wrapper"]');

    // ASSERT
    expect(wrapper.attributes('style')).toBe(
      `color: ${customStyle.wrapper.color};`,
    );
    expect(titleWrapper.attributes('style')).toBe(
      `color: ${customStyle.title.wrapper.color};`,
    );
  });

  it('renders the default slot content', () => {
    // ARRANGE
    const content = faker.lorem.words();
    const wrapper = mount(Section, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
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
