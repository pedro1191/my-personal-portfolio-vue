<template>
  <div class="home">
    <div class="content row py-5">
      <div class="col-lg-5 d-flex flex-column justify-content-between">
        <div class="row sticky-section h-100">
          <div
            class="header-and-social-media col d-flex flex-column justify-content-between"
          >
            <div class="header">
              <AppTitle title="Pedro de Almeida" />
              <h2 class="font-weight-light">Full-stack Web Developer</h2>
              <h6 class="mt-4">Based in Lisbon, Portugal</h6>
            </div>
            <SocialMedia :socialMedia="socialMedia" />
          </div>
        </div>
      </div>
      <div class="col-lg-7">
        <AppTitle id="portfolio" is-secondary title="Projects" />
        <Portfolio :projects="projects" />
        <AppTitle id="about" is-secondary title="About" class="mt-5" />
        <div class="row">
          <div class="col">
            <p>
              Hey there! I'm a full-stack web developer with
              {{ yearsOfExperience }}+ years of experience building, testing,
              and maintaining enterprise software—often starting from just use
              cases and functional requirements.
            </p>
            <p>
              I got into programming back in 2009 with C, and right away I was
              hooked on the idea of solving problems and bringing ideas to life
              through code.
            </p>
            <p>
              Since kicking off my career in 2014, I've worked on all kinds of
              platforms, but web development is where I truly feel at home. I've
              been doing full-stack work ever since—aside from a two-year break
              between 2016 and 2018 to dive into my master's.
            </p>
            <p>
              Feel free to reach out on my
              <template v-for="(sm, index) in socialMedia" :key="index">
                {{ getSocialMediaTextPrefix(index) }}
                <a
                  :href="sm.link"
                  :class="sm.anchorClasses"
                  target="_blank"
                  rel="noreferrer noopener"
                >
                  {{ sm.name }}
                </a>
              </template>
              profiles!
            </p>
          </div>
        </div>
        <AppTitle id="contact" is-secondary title="Contact" class="mt-5" />
        <div class="row">
          <div class="col">
            <AppForm
              :formGroups="formGroups"
              @formSubmited="submitForm"
              @formGroupTouched="onFormGroupTouch($event)"
            />
          </div>
        </div>
      </div>
    </div>

    <FeedbackMessageModal
      v-if="this.modal.error || this.modal.success"
      @close="onModalClose"
    >
      <p>
        <strong>{{ this.modal.message }}</strong>
      </p>
    </FeedbackMessageModal>
    <Spinner v-if="this.modal.loading" />
  </div>
</template>

<script>
import useVuelidate from '@vuelidate/core';
import { helpers, required, email, maxLength } from '@vuelidate/validators';
import axios from '@/axios-default';
import AppForm from '@/components/Form.vue';
import FeedbackMessageModal from '@/components/FeedbackMessageModal.vue';
import Portfolio from '@/components/Portfolio.vue';
import Spinner from '@/components/Spinner.vue';
import AppTitle from '@/components/Title.vue';
import SocialMedia from '@/components/SocialMedia.vue';
import { PROJECT_LIST } from '@/constants';

export default {
  name: 'AppHome',
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    AppTitle,
    Portfolio,
    AppForm,
    FeedbackMessageModal,
    Spinner,
    SocialMedia,
  },
  data() {
    return {
      projects: PROJECT_LIST,
      socialMedia: [
        {
          name: 'LinkedIn',
          link: 'https://www.linkedin.com/in/phdealmeida/',
          iconClasses: 'fa-brands fa-linkedin-in',
          iconSize: '2x',
        },
        {
          name: 'GitHub',
          link: 'https://github.com/pedro1191',
          iconClasses: 'fa-brands fa-github',
          iconSize: '2x',
        },
      ],
      formGroups: {
        name: {
          label: 'Name *',
          showLabel: true,
          type: 'text',
          description: 'Name *',
          validationMessage: null,
          value: null,
        },
        email: {
          label: 'Email *',
          type: 'email',
          description: 'Email *',
          validationMessage: null,
          value: null,
        },
        message: {
          label: 'Message *',
          type: 'textarea',
          description: 'Message *',
          validationMessage: null,
          value: null,
        },
        submit: {
          type: 'submit',
          description: 'Send',
          disabled: true,
        },
      },
      modal: {
        loading: false,
        error: false,
        success: false,
        message: null,
      },
    };
  },
  computed: {
    formName: function () {
      return this.formGroups.name.value;
    },
    formEmail: function () {
      return this.formGroups.email.value;
    },
    formMessage: function () {
      return this.formGroups.message.value;
    },
    isFormValid: function () {
      return this.v$.$invalid;
    },
    yearsOfExperience: function () {
      const currentYear = new Date().getFullYear();
      const careerStart = 2014;
      const masterDegreeBreak = 2;

      return currentYear - careerStart - masterDegreeBreak;
    },
  },
  watch: {
    formName: function () {
      this.setValidationMessage('name');
    },
    formEmail: function () {
      this.setValidationMessage('email');
    },
    formMessage: function () {
      this.setValidationMessage('message');
    },
    isFormValid: function (value) {
      this.formGroups.submit.disabled = value;
    },
  },
  methods: {
    async submitForm() {
      const isFormCorrect = await this.v$.$validate();
      if (!isFormCorrect) return;

      this.modal.loading = true;
      const data = {};

      for (let key in this.formGroups) {
        if (this.formGroups[key].value) {
          data[key] = this.formGroups[key].value;
        }
      }

      axios
        .post('/messages', data)
        .then((response) => {
          this.modal.loading = false;
          this.modal.success = true;
          this.modal.message = response.data.message;
          this.resetForm();
        })
        .catch((error) => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestError(error) {
      this.modal.loading = false;
      this.modal.error = true;

      switch (error.response.status) {
        case 422: {
          const errors = error.response.data.errors;
          this.modal.message = error.response.data.message;

          for (let key in errors) {
            this.formGroups[key].validationMessage = errors[key].join(' ');
          }
          break;
        }
        default:
          this.modal.message = 'Oops! Something went wrong.';
      }
    },
    onModalClose() {
      this.modal.loading = false;
      this.modal.message = null;
      this.modal.error = false;
      this.modal.success = false;
    },
    resetForm() {
      this.v$.$reset();
      this.formGroups.name.value = null;
      this.formGroups.email.value = null;
      this.formGroups.message.value = null;
    },
    onFormGroupTouch(key) {
      this.v$.formGroups[key].value.$touch();
    },
    setValidationMessage(key) {
      if (!this.v$.formGroups[key].value.$dirty) {
        return;
      }
      if (this.v$.formGroups[key].$invalid) {
        this.formGroups[key].validationMessage = this.v$.formGroups[key].$errors
          .map((error) => error.$message)
          .join('. ');
      } else {
        this.formGroups[key].validationMessage = null;
      }
    },
    getSocialMediaTextPrefix(index) {
      return index === 0 ? '' : ' and ';
    },
  },
  validations() {
    return {
      formGroups: {
        name: {
          value: {
            required: helpers.withMessage(
              'The name field is required.',
              required,
            ),
            maxLength: maxLength(100),
          },
        },
        email: {
          value: {
            required: helpers.withMessage(
              'The email field is required.',
              required,
            ),
            email: helpers.withMessage(
              'The email field must be a valid email address.',
              email,
            ),
            maxLength: maxLength(100),
          },
        },
        message: {
          value: {
            required: helpers.withMessage(
              'The message field is required.',
              required,
            ),
            maxLength: maxLength(3000),
          },
        },
      },
    };
  },
};
</script>

<style scoped>
.content {
  row-gap: 4rem;
}

.header-and-social-media {
  gap: 2rem;
}

.sticky-section {
  position: sticky;
  top: calc(var(--navbar-height) + 3rem);
  max-height: calc(100vh - var(--navbar-height) - 6rem);
}
</style>
