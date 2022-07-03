import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import Modal from '@/components/Modal.vue';

describe('Modal.vue', () => {
  it('renders props.customContentStyle when passed', () => {
    // ARRANGE
    const colorFormat = { format: 'css' };
    const customContentStyle = {
      color: faker.color.rgb(colorFormat),
    };
    const wrapper = mount(Modal, {
      props: { customContentStyle },
    });

    // ACT
    const content = wrapper.get('[class="modal-content"]');

    // ASSERT
    expect(content.attributes('style')).toBe(
      `color: ${customContentStyle.color};`
    );
  });

  it('renders the slots', () => {
    // ARRANGE
    const headerContent = faker.lorem.words();
    const bodyContent = faker.lorem.words();
    const footerContent = faker.lorem.words();
    const wrapper = mount(Modal, {
      slots: {
        header: headerContent,
        body: bodyContent,
        footer: footerContent,
      },
    });

    // ACT
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toContain(headerContent);
    expect(wrapperText).toContain(bodyContent);
    expect(wrapperText).toContain(footerContent);
  });
});
