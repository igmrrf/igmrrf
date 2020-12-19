import { rotate, pulse, colorPulse } from './effects';

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
  effects: {
    rotate,
    pulse,
    colorPulse,
  },
};

export const darkTheme = {
  main: 'blue',
  dark: 'darkblue',
  light: 'lightblue',
  typography,
  effects: {
    rotate,
    pulse,
    colorPulse,
  },
};
export const lightTheme = {
  main: 'rgb(0, 12, 24)',
  dark: 'darkblue',
  light: 'lightblue',
  typography,
  effects: {
    rotate,
    pulse,
    colorPulse,
  },
};

export default theme;
