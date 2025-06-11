import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import GlobalLayout from '@/views/GlobalLayout.vue';

describe('GlobalLayout.vue', () => {
  beforeEach(() => {
    vi.mock('@/composables/theme.js');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

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
  });
});
