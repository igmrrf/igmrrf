import { rotate, pulse, colorPulse } from './effects';

const effects = {
  rotate,
  pulse,
  colorPulse,
};
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
  main: '#00FF66',
  dark: 'darkblue',
  light: 'lightblue',
  typography,
  effects,
};

export const darkTheme = {
  ichi: 'rgb(0, 12, 24)',
  ni: 'darkgreen',
  san: 'white',
  typography,
  effects,
};
export const lightTheme = {
  ichi: 'white',
  ni: 'green',
  san: 'rgb(0, 12, 24)',
  typography,
  effects,
};

export default theme;
