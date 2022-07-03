import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import ZoomAnimation from '@/components/ZoomAnimation.vue';

describe('ZoomAnimation.vue', () => {
  it('renders a ZoomAnimation', () => {
    // ARRANGE
    const defaultContent = faker.lorem.words();
    const wrapper = mount(ZoomAnimation, {
      slots: {
        default: defaultContent,
      },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toBe(defaultContent);
  });
});
