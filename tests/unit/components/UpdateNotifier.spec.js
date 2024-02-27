import { mount } from '@vue/test-utils';
import { describe, expect, it} from 'vitest';
import UpdateNotifier from '@/components/UpdateNotifier.vue';

describe('UpdateNotifier.vue', () => {
  it('renders a UpdateNotifier', () => {
    // ARRANGE
    const wrapper = mount(UpdateNotifier, {
      data() {
        return { updateExists: true };
      },
    });

    // ACT
    const wrapperText = wrapper.text();
    const button = wrapper.get('button');

    // ASSERT
    expect(wrapperText).toContain('There is an update available!');
    expect(button.text()).toBe('Refresh');
  });
});
