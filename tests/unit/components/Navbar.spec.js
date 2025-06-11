import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { RouterLinkStub } from '@vue/test-utils';
import Navbar from '@/components/Navbar.vue';

describe('Navbar.vue', () => {
  beforeEach(() => {
    vi.mock('@/composables/theme.js');
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('renders props.menuTogglerTitle when passed', () => {
    // ARRANGE
    const menuTogglerTitle = faker.lorem.words();
    const navLinks = [];
    const wrapper = mount(Navbar, {
      global: {
        stubs: ['FontAwesomeIcon', 'RouterLink'],
      },
      props: { menuTogglerTitle, navLinks },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toMatch(menuTogglerTitle);
  });

  it('renders props.navLinks when passed', () => {
    // ARRANGE
    const numberOfItems = faker.number.int({ min: 1, max: 3 });
    const navLinks = [];
    for (let i = 0; i < numberOfItems; i++) {
      navLinks.push({
        name: faker.lorem.word(),
        reference_id: faker.lorem.word(),
        link: {
          hash: `#${faker.lorem.word()}`,
        },
      });
    }
    const wrapper = mount(Navbar, {
      global: {
        stubs: {
          FontAwesomeIcon: true,
          RouterLink: RouterLinkStub,
        },
      },
      props: { navLinks },
    });

    // ACT
    const anchors = wrapper.findAllComponents(RouterLinkStub);
    anchors.splice(0, 1); // ignores the default home link (always the first one)

    // ASSERT
    expect(navLinks.length).toBe(anchors.length);
    anchors.forEach((anchor, index) => {
      expect(anchor.text()).toBe(navLinks[index].name);
      expect(anchor.props().to).toEqual({
        name: 'home',
        hash: navLinks[index].link.hash,
      });
    });
  });

  it('has the toggle theme button', () => {
    // ARRANGE
    const navLinks = [];
    const wrapper = mount(Navbar, {
      global: {
        stubs: ['FontAwesomeIcon', 'RouterLink'],
      },
      props: { navLinks },
    });

    // ACT
    const themeToggleButton = wrapper.get('.theme-toggle');

    // ASSERT
    expect(themeToggleButton.exists()).toBeTruthy();
  });
});
