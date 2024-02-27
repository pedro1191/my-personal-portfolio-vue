import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Portfolio from '@/components/Portfolio.vue';

describe('Portfolio.vue', () => {
  it('renders props.projects when passed', () => {
    // ARRANGE
    const numberOfItems = faker.datatype.number({ min: 1, max: 2 });
    const projects = [];
    for (let i = 0; i < numberOfItems; i++) {
      projects.push({
        id: faker.datatype.uuid(),
        description: faker.lorem.sentence(),
        name: faker.lorem.words(),
        image: faker.image.imageUrl(),
        live_demo_link: faker.internet.url(),
        source_code_link: faker.internet.url(),
      });
    }
    const wrapper = mount(Portfolio, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { projects },
    });

    // ACT
    const images = wrapper.findAll('img');

    // ASSERT
    expect(projects.length).toBe(images.length);
    images.forEach((image, index) => {
      expect(image.attributes('src')).toBe(projects[index].image);
      expect(image.attributes('alt')).toBe(projects[index].name);
    });
  });

  it('loads the correct data when the project is clicked', async () => {
    // ARRANGE
    const numberOfItems = faker.datatype.number({ min: 1, max: 2 });
    const projects = [];
    for (let i = 0; i < numberOfItems; i++) {
      projects.push({
        id: faker.datatype.uuid(),
        description: faker.lorem.sentence(),
        name: faker.lorem.words(),
        image: faker.image.imageUrl(),
        live_demo_link: faker.internet.url(),
        source_code_link: faker.internet.url(),
      });
    }
    const wrapper = mount(Portfolio, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { projects },
    });

    // ACT
    const buttons = wrapper.findAll('button');

    // ASSERT
    expect(projects.length).toBe(buttons.length);
    for (let i = 0; i < buttons.length; i++) {
      await buttons[i].trigger('click');

      const liveDemoLink = wrapper.get(
        `[href="${projects[i].live_demo_link}"]`,
      );
      const sourceCodeLink = wrapper.get(
        `[href="${projects[i].source_code_link}"]`,
      );

      expect(liveDemoLink.text()).toBe('Live Demo');
      expect(sourceCodeLink.text()).toBe('Source Code');
      expect(wrapper.text()).toContain(projects[i].name);
      expect(wrapper.text()).toContain(projects[i].description);
    }
  });
});
