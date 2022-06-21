import { mount } from '@vue/test-utils';
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
