import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import ThemeToggle from '@/components/ThemeToggle.vue';
import { InverseTheme, Theme } from '@/constants';

describe('ThemeToggle.vue', () => {
  it('renders a ThemeToggle', () => {
    // ARRANGE
    const props = {
      theme: Theme.Light,
    };
    const wrapper = mount(ThemeToggle, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props,
    });

    // ACT
    const themeToggleButton = wrapper.get('button');

    // ASSERT
    expect(themeToggleButton.exists()).toBeTruthy();
    expect(themeToggleButton.attributes().title).toBe(
      `Switch to ${InverseTheme[props.theme]} theme`,
    );
  });

  it('emits the toggleTheme event when the button is pressed', () => {
    // ARRANGE
    const wrapper = mount(ThemeToggle, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: {
        theme: Theme.Dark,
      },
    });

    // ACT
    wrapper.get('button').trigger('click');

    // ASSERT
    expect(wrapper.emitted().toggleTheme).toBeTruthy();
  });
});
