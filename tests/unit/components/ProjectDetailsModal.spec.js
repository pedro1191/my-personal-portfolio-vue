import { faker } from '@faker-js/faker';
import { mount } from '@vue/test-utils';
import { nextTick } from 'vue';
import { describe, expect, it } from 'vitest';
import { TIMEOUT_MS } from '@/mixins/modal';
import ProjectDetailsModal from '@/components/ProjectDetailsModal.vue';

describe('ProjectDetailsModal.vue', () => {
  it('renders a ProjectDetailsModal', async () => {
    // ARRANGE
    const defaultContent = faker.lorem.words();
    const wrapper = mount(ProjectDetailsModal, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
      slots: {
        default: defaultContent,
      },
    });

    // ACT
    await nextTick();
    const wrapperText = wrapper.text();

    // ASSERT
    expect(wrapperText).toContain(defaultContent);
  });

  it('emits the close event when the button is clicked', (done) => {
    // ARRANGE
    const wrapper = mount(ProjectDetailsModal, {
      global: {
        stubs: ['FontAwesomeIcon'],
      },
    });

    // ACT
    wrapper.vm.$nextTick(async () => {
      await wrapper.get('button').trigger('click');

      // ASSERT
      setTimeout(() => {
        expect(wrapper.emitted().close).toBeTruthy();
        done();
      }, TIMEOUT_MS);
    });
  });
});
