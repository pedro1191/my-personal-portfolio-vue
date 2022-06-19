import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import Logo from '@/components/Logo.vue';

describe('Logo.vue', () => {
  it('renders props.customStyle when passed', () => {
    // ARRANGE
    const colorFormat = { format: 'css' };
    const customStyle = {
      color: faker.color.rgb(colorFormat),
    };
    const wrapper = mount(Logo, {
      props: { customStyle },
    });

    // ACT
    const wrapperStyle = wrapper.attributes('style');

    // ASSERT
    expect(wrapperStyle).toBe(`color: ${customStyle.color};`);
  });
});
