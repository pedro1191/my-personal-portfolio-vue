import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('renders the current year', () => {
    // ARRANGE
    const thisYear = new Date().getFullYear().toString();
    const wrapper = mount(Footer);

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toContain(thisYear);
  });

  it('renders the default slot content', () => {
    // ARRANGE
    const content = faker.lorem.words();
    const wrapper = mount(Footer, {
      slots: {
        default: content,
      },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toContain(content);
  });
});
