import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import ProjectDetails from '@/components/ProjectDetails.vue';

describe('ProjectDetails.vue', () => {
  it('renders props.project when passed', () => {
    // ARRANGE
    const project = {
      name: faker.lorem.words(),
      description: faker.lorem.sentence(),
      image: faker.image.imageUrl(),
      live_demo_link: faker.internet.url(),
      source_code_link: faker.internet.url(),
    };
    const wrapper = mount(ProjectDetails, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { project },
    });

    // ACT
    const liveDemoLink = wrapper.get(`[href="${project.live_demo_link}"]`);
    const sourceCodeLink = wrapper.get(`[href="${project.source_code_link}"]`);
    const image = wrapper.get('img');

    // ASSERT
    expect(liveDemoLink.text()).toBe('Live Demo');
    expect(sourceCodeLink.text()).toBe('Source Code');
    expect(wrapper.text()).toContain(project.name);
    expect(wrapper.text()).toContain(project.description);
    expect(image.attributes('src')).toBe(project.image);
  });

  it('emits the projectClosed event when the close button is clicked', async () => {
    // ARRANGE
    const project = {
      name: faker.lorem.words(),
      description: faker.lorem.sentence(),
      image: faker.image.imageUrl(),
      live_demo_link: faker.internet.url(),
      source_code_link: faker.internet.url(),
    };
    const wrapper = mount(ProjectDetails, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      props: { project },
    });

    // ACT
    await wrapper.get('button').trigger('click');

    // ASSERT
    expect(wrapper.emitted().projectClosed).toBeTruthy();
  });
});