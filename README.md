# Pedro de Almeida's Portfolio

Hello and welcome to my portfolio!

This is a Progressive Web Application built using [Vue.js](https://vuejs.org/). It consumes a [REST API](https://github.com/pedro1191/my-personal-portfolio-rest) to load the portfolio's projects and send contact messages.

The following technologies are being used:
- [axios](https://github.com/axios/axios): to consume the [REST API](https://github.com/pedro1191/my-personal-portfolio-rest)
- [bootstrap](https://getbootstrap.com/)
- [font awesome](https://fontawesome.com/)
- [vue-gtag](https://github.com/MatteoGabriele/vue-gtag): to send event data to Google Analytics
- [vuelidate](https://github.com/vuelidate/vuelidate): to validate the contact form

Please visit [https://pedrohsalmeida.com/](https://pedrohsalmeida.com/) for a live demo.


## Project setup
### Install dependencies
```
npm install
```

### Create a **.env.local** file from **.env.example** and set the environment variable values
```
cp .env.example .env.local
```

- **PORT**: optional. The port in which the application should run
- **VUE_APP_DEFAULT_BACKEND_API_URL**: mandatory. It should point to a running instance of the [REST API](https://github.com/pedro1191/my-personal-portfolio-rest) it consumes

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Runs unit tests
```
npm run test:unit
```

### Runs end-to-end tests
```
npm run test:e2e
```

### Lints and fixes files
```
npm run lint
```