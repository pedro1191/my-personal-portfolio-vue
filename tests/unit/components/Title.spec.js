import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
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

  it('renders props.customStyle when passed', () => {
    // ARRANGE
    const colorFormat = { format: 'css' };
    const title = faker.lorem.words();
    const customStyle = {
      wrapper: {
        color: faker.color.rgb(colorFormat),
      },
      title: {
        color: faker.color.rgb(colorFormat),
      },
      divider: {
        color: faker.color.rgb(colorFormat),
      },
    };
    const wrapper = mount(Title, {
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
    const titleText = wrapper.get('[data-test="title-text"]');
    const divider = wrapper.get('[data-test="divider"]');

    // ASSERT
    expect(titleWrapper.attributes('style')).toBe(
      `color: ${customStyle.wrapper.color};`,
    );
    expect(titleText.attributes('style')).toBe(
      `color: ${customStyle.title.color};`,
    );
    expect(divider.attributes('style')).toBe(
      `color: ${customStyle.divider.color};`,
    );
  });
});
