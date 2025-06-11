import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Portfolio from '@/components/Portfolio.vue';

describe('Portfolio.vue', () => {
  it('renders props.projects when passed', () => {
    // ARRANGE
    const numberOfItems = faker.number.int({ min: 1, max: 2 });
    const projects = [];
    for (let i = 0; i < numberOfItems; i++) {
      projects.push({
        id: faker.string.uuid(),
        description: faker.lorem.sentence(),
        name: faker.lorem.words(),
        image: faker.image.url(),
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
});
