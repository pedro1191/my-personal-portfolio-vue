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
              I'm a full-stack web developer with {{ yearsOfExperience }}+ years
              of experience developing, testing, and maintaining enterprise
              software applications, often designing and developing from use
              cases and functional requirements.
            </p>
            <p>
              My first contact with programming was in 2009, using C language.
              Learning how to solve problems and "give life" to things was
              something that amused me from the start.
            </p>
            <p>
              I started my career in 2014 and have already worked with different
              platforms, but it was in web development that I found my place.
              I've been working as a full-stack developer since the beginning,
              although I took a "two-year break" to focus on my master's between
              2016 and 2018.
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
      :customContentStyle="{ backgroundColor: '#fff' }"
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
import AppHeader from '@/components/Header.vue';
// import Logo from '@/components/Logo.vue';
import FeedbackMessageModal from '@/components/FeedbackMessageModal.vue';
import Portfolio from '@/components/Portfolio.vue';
import AppSection from '@/components/Section.vue';
import Spinner from '@/components/Spinner.vue';
import AppTitle from '@/components/Title.vue';
import SocialMedia from '@/components/SocialMedia.vue';

export default {
  name: 'AppHome',
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    AppHeader,
    // Logo,
    AppTitle,
    AppSection,
    Portfolio,
    AppForm,
    FeedbackMessageModal,
    Spinner,
    SocialMedia,
  },
  data() {
    return {
      projects: [],
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
  mounted() {
    this.modal.loading = true;

    axios
      .get('/projects')
      .then((response) => {
        this.modal.loading = false;
        this.projects = response.data.data;
      })
      .catch((error) => {
        this.onHttpRequestError(error);
      });
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
      if (index <= 0) return '';

      return ' and ';
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
/* section::before {
  height: 74px;
  content: '';
  display: block;
} */
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

@media (min-width: 768px) {
  header#home::before {
    /* height: 74px; */
    content: '';
    display: block;
  }
}
</style>
