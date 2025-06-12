export const Theme = {
  Dark: 'dark',
  Light: 'light',
  Default: 'dark',
};

export const InverseTheme = {
  [Theme.Dark]: Theme.Light,
  [Theme.Light]: Theme.Dark,
};

export const USER_THEME_KEY = 'theme';

export const PROJECT_LIST = [
  {
    id: 1,
    name: 'FoodClub',
    description:
      '<p>This is a complete sample application that shows items divided by categories. It has a dashboard with authentication where the administrator can manage them and a contact page to send messages. The "theme" chosen here relates to culinary, but it could have been anything else.</p><p>Overall, it was built using the Vue.js and Laravel frameworks. Please refer to its source code link above for documentation and technical details.</p>',
    chips: ['Vue', 'JavaScript', 'HTML', 'CSS', 'PHP', 'Laravel'],
    image: '/img/projects/foodclub.png',
    live_demo_link: 'https://foodclub.pedrohsalmeida.com',
    source_code_link: 'https://github.com/pedro1191/my-products-vue',
  },
  {
    id: 2,
    name: 'Pokémon Game',
    description:
      '<p>This is a simple Pokémon game. The player can select two pokémons at a time and make them fight until there is only one pokémon left, which will be the champion. The pokémons are loaded from the open RESTful API <a href="https://pokeapi.co/docs/v2" target="_blank" rel="noreferrer noopener">PokéAPI</a>.</p><p>Overall, it was built using the Vue.js framework. Please refer to its source code link above for documentation and technical details.</p>',
    image: '/img/projects/pokemon.png',
    chips: ['Vue', 'TypeScript', 'HTML', 'CSS'],
    live_demo_link: 'https://pokemongame.pedrohsalmeida.com',
    source_code_link: 'https://github.com/pedro1191/pokemon-challenge',
  },
  {
    id: 3,
    name: 'My Portfolio',
    description:
      "<p>This is the application that you are currently in. It loads the portfolio's projects and sends contact messages.</p><p>Overall, it was built using the Vue.js and Laravel frameworks. Please refer to its source code link above for documentation and technical details.</p>",
    chips: ['Vue', 'JavaScript', 'HTML', 'CSS'],
    image: '/img/projects/portfolio.png',
    live_demo_link: 'https://www.pedrohsalmeida.com',
    source_code_link: 'https://github.com/pedro1191/my-personal-portfolio-vue',
  },
];
