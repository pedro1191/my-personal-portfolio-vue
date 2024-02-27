import { faker } from '@faker-js/faker';
import { faGithub, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import SocialMedia from '@/components/SocialMedia.vue';

library.add(faGithub, faLinkedinIn);

describe('SocialMedia.vue', () => {
  it('renders props.socialMedia when passed', () => {
    // ARRANGE
    const iconClasses = ['fa-brands fa-linkedin-in', 'fa-brands fa-github'];
    const numberOfItems = faker.datatype.number({ min: 1, max: 2 });
    const socialMedia = [];
    for (let i = 0; i < numberOfItems; i++) {
      socialMedia.push({
        anchorClasses: faker.lorem.words(),
        name: faker.lorem.words(),
        iconClasses: iconClasses[i],
        iconSize: `${faker.datatype.number({ min: 1, max: 3 })}x`,
        link: faker.internet.url(),
      });
    }
    const wrapper = mount(SocialMedia, {
      global: {
        stubs: { FontAwesomeIcon },
      },
      props: { socialMedia },
    });

    // ACT
    const anchors = wrapper.findAll('a');

    // ASSERT
    expect(socialMedia.length).toBe(anchors.length);
    anchors.forEach((anchor, index) => {
      expect(anchor.attributes('class')).toBe(socialMedia[index].anchorClasses);
      expect(anchor.attributes('href')).toBe(socialMedia[index].link);
      const icon = anchor.find('svg');
      const expectedIconClasses = `${socialMedia[index].iconClasses.replace(
        'fa-brands',
        '',
      )} fa-${socialMedia[index].iconSize}`;
      expect(icon.attributes('class')).toContain(expectedIconClasses);
      expect(icon.text()).toBe(socialMedia[index].name);
    });
  });
});
