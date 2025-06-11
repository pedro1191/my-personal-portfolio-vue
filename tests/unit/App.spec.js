import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, it, vi } from 'vitest';
import App from '@/App.vue';

describe('App.vue', () => {
  beforeEach(() => {
    vi.mock('@/composables/theme.js');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders properly', () => {
    mount(App, {
      global: {
        stubs: ['FontAwesomeIcon', 'RouterLink', 'RouterView'],
      },
    });
  });
});
