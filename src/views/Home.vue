<template>
  <div class="home">

    <app-header class="bg-info" id="home">
      <app-logo class="img-fluid mb-5 d-block mx-auto" />
      <app-title title="Pedro de Almeida" class="bg-info" :customStyle="appTitleCustomStyle" />
      <h2 class="font-weight-light">Full Stack Web Developer</h2>
    </app-header>

    <app-section id="portfolio" class="bg-white" title="PORTFOLIO">
      <h5 class="font-weight-light">(The portfolio is still in development)</h5>
      <app-portfolio :projects="projects" />
    </app-section>

    <app-section id="about" class="bg-info text-white" title="ABOUT">
      <div class="row">
        <div class="col-md-6">
          <p class="lead">I am a Technologist in System Analysis and Development who graduated in 2014 from the Federal University of Technology - Paraná.</p>
          <p class="lead">I worked in a company as a Full Stack Developer until 2016, when I decided to apply for a Master's Degree in Applied Computing.</p>
          <p class="lead">In 2018, I obtained my Master's Degree in Applied Computing from the State University of Ponta Grossa. Since then, I have been working full-time as a Full Stack Web Developer.</p>
        </div>
        <div class="col-md-6">
          <p class="lead">Currently, I have more than five years of experience in system development. Although I have already worked with several Front-End and Back-End development technologies, my most considerable experience is with some specific tools.</p>
          <p class="lead">I use Vue JS and React JS for the Front-End development, focusing on Progressive Web Applications. And I have experience creating RESTful and GraphQL APIs for Back-End development, mainly with Laravel/Lumen framework in PHP programming language. I also work with relational database management systems, like PostgreSQL, MySQL, and SQLServer.</p>
        </div>
      </div>
    </app-section>

    <app-section id="contact" class="bg-white" title="CONTACT">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <app-form :formGroups="formGroups" @formSubmited="submitForm" @formGroupTouched="onFormGroupTouch($event)" />
        </div>
      </div>
    </app-section>

    <app-modal v-if="this.modal.error || this.modal.success" :customContentStyle="{ backgroundColor: '#fff' }">
      <p slot="body"><strong>{{ this.modal.message }}</strong></p>
      <button slot="footer" title="Close" class="btn btn-info" @click="onModalClose">Ok</button>
    </app-modal>
    <app-modal v-if="this.modal.loading">
      <app-spinner slot="body" />
    </app-modal>
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import Logo from '../components/Logo.vue';
import Title from '../components/Title.vue';
import Section from '../components/Section.vue';
import Portfolio from '../components/Portfolio.vue';
import Form from '../components/Form.vue';
import Modal from '../components/Modal.vue';
import Spinner from '../components/Spinner.vue';
import { required, email, maxLength } from 'vuelidate/lib/validators';
import axios from '../axios-default';

export default {
  data() {
    return {
      appTitleCustomStyle: {
        title: {
          fontSize: '4rem'
        }
      },
      projects: [],
      formGroups: {
        name: {
          label: 'Name',
          showLabel: true,
          type: 'text',
          description: 'Name',
          validationMessage: null,
          value: null
        },
        email: {
          label: 'Email',
          type: 'email',
          description: 'Email',
          validationMessage: null,
          value: null
        },
        message: {
          label: 'Message',
          type: 'textarea',
          description: 'Message',
          validationMessage: null,
          value: null
        },
        submit: {
          type: 'submit',
          description: 'Send',
          disabled: true
        }
      },
      modal: {
        loading: false,
        error: false,
        success: false,
        message: null
      }
    };
  },
  mounted() {
    this.modal.loading = true;

    axios
      .get('/projects')
      .then(response => {
        this.modal.loading = false;
        this.projects = response.data.data;
      })
      .catch(error => {
        this.onHttpRequestError(error);
      });
  },
  watch: {
    formName: function() {
      if (!this.$v.formGroups.name.value.$dirty) {
        return;
      }
      if (!this.$v.formGroups.name.value.maxLength) {
        this.formGroups.name.validationMessage = `The name may not be greater than ${
          this.$v.formGroups.name.value.$params.maxLength.max
        } characters.`;
      } else if (!this.$v.formGroups.name.value.required) {
        this.formGroups.name.validationMessage = 'The name field is required.';
      } else {
        this.formGroups.name.validationMessage = null;
      }
    },
    formEmail: function() {
      if (!this.$v.formGroups.email.value.$dirty) {
        return;
      }
      if (!this.$v.formGroups.email.value.email) {
        this.formGroups.email.validationMessage =
          'The email must be a valid email address.';
      } else if (!this.$v.formGroups.email.value.maxLength) {
        this.formGroups.email.validationMessage = `The email may not be greater than ${
          this.$v.formGroups.email.value.$params.maxLength.max
        } characters.`;
      } else if (!this.$v.formGroups.email.value.required) {
        this.formGroups.email.validationMessage =
          'The email field is required.';
      } else {
        this.formGroups.email.validationMessage = null;
      }
    },
    formMessage: function() {
      if (!this.$v.formGroups.message.value.$dirty) {
        return;
      }
      if (!this.$v.formGroups.message.value.maxLength) {
        this.formGroups.message.validationMessage = `The message may not be greater than ${
          this.$v.formGroups.message.value.$params.maxLength.max
        } characters.`;
      } else if (!this.$v.formGroups.message.value.required) {
        this.formGroups.message.validationMessage =
          'The message field is required.';
      } else {
        this.formGroups.message.validationMessage = null;
      }
    },
    isFormValid: function(value) {
      this.formGroups.submit.disabled = value;
    }
  },
  computed: {
    formName: function() {
      return this.formGroups.name.value;
    },
    formEmail: function() {
      return this.formGroups.email.value;
    },
    formMessage: function() {
      return this.formGroups.message.value;
    },
    isFormValid: function() {
      return this.$v.$invalid;
    }
  },
  methods: {
    submitForm() {
      this.modal.loading = true;
      const data = {};

      for (let key in this.formGroups) {
        if (this.formGroups[key].value) {
          data[key] = this.formGroups[key].value;
        }
      }

      axios
        .post('/messages', data)
        .then(response => {
          this.modal.loading = false;
          this.modal.success = true;
          this.modal.message = response.data.message;
          this.resetForm();
        })
        .catch(error => {
          this.onHttpRequestError(error);
        });
    },
    onHttpRequestError(error) {
      this.modal.loading = false;
      this.modal.error = true;
      const errors = error.response.data.errors;

      switch (error.response.status) {
        case 422:
          this.modal.message = error.response.data.message;

          for (let key in errors) {
            this.formGroups[key].validationMessage = errors[key].join(' ');
          }
          break;
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
      this.$v.$reset();
      this.formGroups.name.value = null;
      this.formGroups.email.value = null;
      this.formGroups.message.value = null;
    },
    onFormGroupTouch(key) {
      this.$v.formGroups[key].value.$touch();
    }
  },
  components: {
    appHeader: Header,
    appLogo: Logo,
    appTitle: Title,
    appSection: Section,
    appPortfolio: Portfolio,
    appForm: Form,
    appModal: Modal,
    appSpinner: Spinner
  },
  validations: {
    formGroups: {
      name: {
        value: {
          required,
          maxLength: maxLength(100)
        }
      },
      email: {
        value: {
          required,
          email,
          maxLength: maxLength(100)
        }
      },
      message: {
        value: {
          required,
          maxLength: maxLength(3000)
        }
      }
    }
  }
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
