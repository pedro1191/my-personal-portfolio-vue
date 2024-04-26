import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Footer from '@/components/Footer.vue';

describe('Footer.vue', () => {
  it('renders the text content', () => {
    // ARRANGE
    const thisYear = new Date().getFullYear().toString();
    const text = `Pedro de Almeida's Portfolio ${thisYear}`;
    const wrapper = mount(Footer);

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toBe(text);
  });
});
