<template>
  <div class="home">

    <app-header class="bg-info" id="home">
      <app-logo class="img-fluid mb-5 d-block mx-auto" />
      <app-title title="Pedro de Almeida" class="bg-info" :customStyle="appTitleCustomStyle" />
      <h2 class="font-weight-light">Full Stack Web Developer</h2>
    </app-header>

    <app-section id="portfolio" class="bg-white" title="PORTFOLIO">
      <app-portfolio :projects="projects" />
    </app-section>

    <app-section id="about" class="bg-info text-white" title="ABOUT">
      <div class="row">
        <div class="col-md-6">
          <p class="lead">I'm a Full Stack Web Developer.</p>
        </div>
        <div class="col-md-6">
          <p class="lead">Some other text.</p>
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
      projects: [
        {
          id: 1,
          name: 'My Portfolio',
          description:
            'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Mollitia neque assumenda ipsam nihil, molestias magnam, recusandae quos quis inventore quisquam velit asperiores, vitae? Reprehenderit soluta, eos quod consequuntur itaque. Nam.',
          image:
            'https://blackrockdigital.github.io/startbootstrap-freelancer/img/portfolio/circus.png',
          links: {
            liveDemo: null,
            sourceCode: null
          }
        },
        {
          id: 2,
          name: 'My Portfolio Back End',
          description:
            '<p>"My Products" trata-se de um projeto front end desenvolvido utilizando o framework Vue JS. ' +
            'Ele comunica-se com uma API RESTful desenvolvida em PHP utilizando o framework Laravel/Lumen. ' +
            'O código fonte dessa API pode ser conferido <a href="" target="_blank" rel="noreferrer noopener">neste link</a>.</p>' +
            '<button data-project-id="1")>Project 1</button>' +
            '<p>Uma versão de demonstração, bem como o código fonte do projeto, podem ser acessados pelos botões abaixo.</p>.',
          image: 'http://placehold.it/900x650?text=RESTful%20API',
          links: {
            liveDemo: null,
            sourceCode: null
          }
        },
        {
          id: 3,
          name: 'My Products',
          description:
            '<p>"My Products" trata-se de um projeto front end desenvolvido utilizando o framework Vue JS. ' +
            'Ele comunica-se com uma API RESTful desenvolvida em PHP utilizando o framework Laravel/Lumen. ' +
            'O código fonte dessa API pode ser conferido <a href="" target="_blank" rel="noreferrer noopener">neste link</a>.</p>' +
            '<button data-project-id="1")>Project 1</button>' +
            '<p>Uma versão de demonstração, bem como o código fonte do projeto, podem ser acessados pelos botões abaixo.</p>.',
          image:
            'https://blackrockdigital.github.io/startbootstrap-freelancer/img/portfolio/cabin.png',
          links: {
            liveDemo: null,
            sourceCode: null
          }
        },
        {
          id: 4,
          name: 'My Products Back End',
          description:
            '<p>"My Products" trata-se de um projeto front end desenvolvido utilizando o framework Vue JS. ' +
            'Ele comunica-se com uma API RESTful desenvolvida em PHP utilizando o framework Laravel/Lumen. ' +
            'O código fonte dessa API pode ser conferido <a href="" target="_blank" rel="noreferrer noopener">neste link</a>.</p>' +
            '<button data-project-id="1")>Project 1</button>' +
            '<p>Uma versão de demonstração, bem como o código fonte do projeto, podem ser acessados pelos botões abaixo.</p>.',
          image: 'http://placehold.it/900x650?text=RESTful%20API',
          links: {
            liveDemo: null,
            sourceCode: null
          }
        }
      ],
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
section::before,
header#home::before {
  height: 74px;
  content: '';
  display: block;
}
</style>
