import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Project from '@/components/Project.vue';

describe('Project.vue', () => {
  it('renders props.project when passed', () => {
    // ARRANGE
    const project = {
      id: faker.string.uuid(),
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

  it('emits the projectOpened event when the open button is clicked', async () => {
    // ARRANGE
    const project = {
      id: faker.string.uuid(),
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
    await wrapper.get('button').trigger('click');

    // ASSERT
    expect(wrapper.emitted().projectOpened[0][0]).toBe(project.id);
  });
});
