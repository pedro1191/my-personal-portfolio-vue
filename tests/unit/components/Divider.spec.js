import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import Divider from '@/components/Divider.vue';

describe('Divider.vue', () => {
  it('renders props.customStyle when passed', () => {
    // ARRANGE
    const colorFormat = { format: 'css' };
    const customStyle = {
      color: faker.color.rgb(colorFormat),
    };
    const wrapper = mount(Divider, {
      props: { customStyle },
    });

    // ACT
    const wrapperStyle = wrapper.attributes('style');

    // ASSERT
    expect(wrapperStyle).toBe(`color: ${customStyle.color};`);
  });
});
