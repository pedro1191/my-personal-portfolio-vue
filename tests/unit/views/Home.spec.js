import { faker } from '@faker-js/faker';
import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';
import axios from '@/axios-default';
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
  it('renders properly', async () => {
    // ARRANGE
    const sectionTitles = ['Pedro de Almeida', 'Projects', 'About', 'Contact'];
    const wrapper = mount(Home, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    });

    // ACT
    const header = wrapper.get('.header');
    const sections = wrapper.findAll('.title');

    // ASSERT
    expect(header.text()).toContain('Full-stack Web Developer');
    expect(header.text()).toContain('Based in Lisbon, Portugal');
    expect(sections.length).toBe(sectionTitles.length);
    sections.forEach((section, index) => {
      expect(section.text()).toContain(sectionTitles[index]);
    });
  });

  it('sends the contact message properly', async () => {
    // ARRANGE
    const mockFeedbackMessage = {
      data: { message: faker.lorem.sentence() },
    };
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
