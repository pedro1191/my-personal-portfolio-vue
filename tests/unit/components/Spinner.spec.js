import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Spinner from '@/components/Spinner.vue';

describe('Spinner.vue', () => {
  it('renders a Spinner', () => {
    // ARRANGE
    const wrapper = mount(Spinner, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toBe('Loading...');
  });
});
