import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Project from '@/components/Project.vue';

describe('Project.vue', () => {
  it('renders project image when passed', () => {
    // ARRANGE
    const project = {
      name: faker.lorem.words(),
      image: faker.image.url(),
    };
    const wrapper = mount(Project, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { project },
    });

    // ACT
    const image = wrapper.get('img');

    // ASSERT
    expect(image.attributes('src')).toBe(project.image);
    expect(image.attributes('alt')).toBe(project.name);
  });

  it('renders project name and description when passed', () => {
    // ARRANGE
    const project = {
      name: faker.lorem.words(),
      description: faker.lorem.words(),
    };
    const wrapper = mount(Project, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { project },
    });

    // ACT
    const text = wrapper.text();

    // ASSERT
    expect(text).toContain(project.name);
    expect(text).toContain(project.description);
  });

  it('renders project chips when passed', () => {
    // ARRANGE
    const project = {
      chips: faker.lorem.words().split(' '),
    };
    const wrapper = mount(Project, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { project },
    });

    // ACT
    const text = wrapper.text();

    // ASSERT
    project.chips.forEach(chip => {
      expect(text).toContain(chip);
    });
  });

  it('renders live demo and source code links when passed', () => {
    // ARRANGE
    const project = {
      live_demo_link: faker.internet.url(),
      source_code_link: faker.internet.url(),
    };
    const wrapper = mount(Project, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { project },
    });

    // ACT
    const links = wrapper.findAll('.btn-link');

    // ASSERT
    expect(links.length).toBe(2);
    expect(links[0].text()).toBe('Live Demo');
    expect(links[0].attributes().href).toBe(project.live_demo_link);
    expect(links[1].text()).toBe('Source Code');
    expect(links[1].attributes().href).toBe(project.source_code_link);
  });
});
