import { rotate, pulse } from './effects';

const typography = {
  h1: '2em',
  h2: '2em',
  h3: '2em',
  h4: '2em',
  h5: '2em',
  h6: '2em',
};
console.log(rotate);

const theme = {
  main: 'blue',
  dark: 'darkblue',
  light: 'lightblue',
  typography,
  effects: {
    rotate,
    pulse,
  },
};

export default theme;
