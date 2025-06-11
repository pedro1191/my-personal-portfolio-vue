import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Logo from '@/components/Logo.vue';

describe('Logo.vue', () => {
  it('renders a Logo', () => {
    // ARRANGE/ACT
    const wrapper = mount(Logo);

    // ASSERT
    expect(wrapper.exists()).toBe(true);
  });
});
