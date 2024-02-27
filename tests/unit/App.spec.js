import { mount } from '@vue/test-utils';
import { describe, it } from 'vitest';
import App from '@/App.vue';

describe('App.vue', () => {
  it('renders properly', () => {
    mount(App, {
      global: {
        stubs: ['FontAwesomeIcon', 'RouterLink', 'RouterView'],
      },
    });
  });
});
