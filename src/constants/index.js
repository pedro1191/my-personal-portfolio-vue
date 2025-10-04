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
    name: 'Product Inventory Dashboard',
    description:
      '<p>This is a simple Product Inventory Dashboard. The user can manage a list of products, including adding, editing, deleting, and filtering items. It also provides statistics based on the current inventory state. The data is loaded from a mocked RESTful API.</p><p>Overall, it was built using the React library. Please refer to its source code link below for documentation and technical details.</p>',
    image: '/img/projects/inventory.png',
    chips: ['React', 'TypeScript', 'HTML', 'Tailwind CSS'],
    live_demo_link: 'https://inventory.pedrohsalmeida.com',
    source_code_link:
      'https://github.com/pedro1191/product-inventory-dashboard',
  },
  {
    id: 2,
    name: 'FoodClub',
    description:
      '<p>This is a complete sample application that shows items divided by categories. It has a dashboard with authentication where the administrator can manage them and a contact page to send messages. The "theme" chosen here relates to culinary, but it could have been anything else.</p><p>Overall, it was built using the Vue.js and Laravel frameworks. Please refer to its source code link below for documentation and technical details.</p>',
    chips: ['Vue', 'JavaScript', 'HTML', 'CSS', 'PHP', 'Laravel'],
    image: '/img/projects/foodclub.png',
    live_demo_link: 'https://foodclub.pedrohsalmeida.com',
    source_code_link: 'https://github.com/pedro1191/my-products-vue',
  },
  {
    id: 3,
    name: 'Pokémon Game',
    description:
      '<p>This is a simple Pokémon game. The player can select two pokémons at a time and make them fight until there is only one pokémon left, which will be the champion. The pokémons are loaded from the open RESTful API <a class="btn-link" href="https://pokeapi.co/docs/v2" target="_blank" rel="noreferrer noopener">PokéAPI</a>.</p><p>Overall, it was built using the Vue.js framework. Please refer to its source code link below for documentation and technical details.</p>',
    image: '/img/projects/pokemon.png',
    chips: ['Vue', 'TypeScript', 'HTML', 'CSS'],
    live_demo_link: 'https://pokemongame.pedrohsalmeida.com',
    source_code_link: 'https://github.com/pedro1191/pokemon-challenge',
  },
  {
    id: 4,
    name: 'My Portfolio',
    description:
      '<p>This is the application that you are currently in. Overall, it was built using the Vue.js framework. Please refer to its source code link below for documentation and technical details.</p>',
    chips: ['Vue', 'JavaScript', 'HTML', 'CSS'],
    image: '/img/projects/portfolio.png',
    live_demo_link: 'https://www.pedrohsalmeida.com',
    source_code_link: 'https://github.com/pedro1191/my-personal-portfolio-vue',
  },
];
