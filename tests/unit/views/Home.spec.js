import { faker } from '@faker-js/faker';
import { flushPromises, mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import axios from '@/axios-default';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  let mockProjectList;

  beforeEach(() => {
    vi.clearAllMocks();
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
    mockProjectList = {
      data: { data: projects },
    };
  });

  it('renders properly', async () => {
    // ARRANGE
    const sectionTitles = ['PORTFOLIO', 'ABOUT', 'CONTACT'];
    vi.spyOn(axios, 'get').mockResolvedValue(mockProjectList);
    const wrapper = mount(Home, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    });

    // ACT
    const header = wrapper.get('header');
    const sections = wrapper.findAll('section');
    await flushPromises();

    // ASSERT
    expect(header.html()).toContain('Full Stack Web Developer');
    expect(sections.length).toBe(sectionTitles.length);
    sections.forEach((section, index) => {
      expect(section.html()).toContain(sectionTitles[index]);
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith('/projects');
  });

  it('sends the contact message properly', async () => {
    // ARRANGE
    const mockFeedbackMessage = {
      data: { message: faker.lorem.sentence() },
    };
    vi.spyOn(axios, 'get').mockResolvedValue(mockProjectList);
    vi.spyOn(axios, 'post').mockResolvedValue(mockFeedbackMessage);
    const wrapper = mount(Home, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    });

    // ACT
    const form = wrapper.get('form');
    const nameInput = form.get('[placeholder="Name *"');
    const emailInput = form.get('[placeholder="Email *"');
    const messageInput = form.get('[placeholder="Message *"');
    const nameValue = faker.person.fullName();
    const emailValue = faker.internet.email();
    const messageValue = faker.lorem.paragraphs();
    const messageData = {
      email: emailValue,
      message: messageValue,
      name: nameValue,
    };
    await nameInput.setValue(nameValue);
    await emailInput.setValue(emailValue);
    await messageInput.setValue(messageValue);
    await form.get('button').trigger('click');
    await flushPromises();

    // ASSERT
    expect(axios.post).toHaveBeenCalledTimes(1);
    expect(axios.post).toHaveBeenCalledWith('/messages', messageData);
  });
});
