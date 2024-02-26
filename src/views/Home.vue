<template>
  <div class="home">
    <AppHeader class="bg-info" id="home">
      <Logo class="img-fluid mb-5 d-block mx-auto" />
      <AppTitle
        title="Pedro de Almeida"
        class="bg-info"
        :customStyle="appTitleCustomStyle"
      />
      <h2 class="font-weight-light">Full Stack Web Developer</h2>
    </AppHeader>

    <AppSection id="portfolio" class="bg-white" title="PORTFOLIO">
      <Portfolio :projects="projects" />
    </AppSection>

    <AppSection id="about" class="bg-info text-white" title="ABOUT">
      <div class="row">
        <div class="col-md-6">
          <p class="lead">
            I'm a Full Stack Web Developer with 6+ years of experience
            developing, testing, and maintaining enterprise software
            applications, often designing and developing from use cases and
            functional requirements.
          </p>
          <p class="lead">
            My first contact with programming was in 2009, using C language.
            Learning how to solve problems and "give life" to things was
            something that amused me from the start.
          </p>
        </div>
        <div class="col-md-6">
          <p class="lead">
            I started my career in 2014 and have already worked with different
            platforms, but it was in Web development that I found my place. I've
            been working as a Full Stack Developer since the beginning, although
            I took a "two-year break" to focus on my master's between 2016 and
            2018.
          </p>
          <p class="lead">
            For more details about my professional experience, please refer to
            my LinkedIn and GitHub profiles in the footer.
          </p>
        </div>
      </div>
    </AppSection>

    <AppSection id="contact" class="bg-white" title="CONTACT">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <AppForm
            :formGroups="formGroups"
            @formSubmited="submitForm"
            @formGroupTouched="onFormGroupTouch($event)"
          />
        </div>
      </div>
    </AppSection>

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
import Logo from '@/components/Logo.vue';
import FeedbackMessageModal from '@/components/FeedbackMessageModal.vue';
import Portfolio from '@/components/Portfolio.vue';
import AppSection from '@/components/Section.vue';
import Spinner from '@/components/Spinner.vue';
import AppTitle from '@/components/Title.vue';

export default {
  name: 'AppHome',
  setup() {
    return { v$: useVuelidate() };
  },
  components: {
    AppHeader,
    Logo,
    AppTitle,
    AppSection,
    Portfolio,
    AppForm,
    FeedbackMessageModal,
    Spinner,
  },
  data() {
    return {
      appTitleCustomStyle: {
        title: {
          fontSize: '4rem',
        },
      },
      projects: [],
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
section::before {
  height: 74px;
  content: '';
  display: block;
}

@media (min-width: 768px) {
  header#home::before {
    height: 74px;
    content: '';
    display: block;
  }
}
</style>
