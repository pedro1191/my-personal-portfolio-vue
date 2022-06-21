import { mount } from '@vue/test-utils';
import GlobalLayout from '@/views/GlobalLayout.vue';

describe('GlobalLayout.vue', () => {
  it('renders properly', () => {
    // ARRANGE
    const wrapper = mount(GlobalLayout, {
      global: {
        stubs: ['FontAwesomeIcon', 'RouterLink', 'RouterView'],
      },
    });

    // ACT
    const nav = wrapper.find('nav');
    const footer = wrapper.find('footer');

    // ASSERT
    expect(nav.exists()).toBeTruthy();
    expect(footer.exists()).toBeTruthy();
    expect(footer.html()).toContain('LOCATION');
    expect(footer.html()).toContain('AROUND THE WEB');
  });
});
