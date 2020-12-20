//Theming
import styled from 'styled-components';

export const Color = styled.div.attrs((props) => ({
  color: props.color,
}))`
  background-color: ${(props) => props.theme[props.color]};
  height: 200px;
  width: 200px;
  margin: 20px;
  border: 2px solid ${(props) => props.theme.yan};
`;
export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${(props) => props.theme.ichi};
  border: 2px solid ${(props) => props.theme.san};
`;

// We are passing a default theme for Buttons that aren't wrapped in the ThemeProvider
Button.defaultProps = {
  theme: {
    main: 'palevioletred',
  },
};

// Define what props.theme will look like
export const theme = {
  main: 'blue',
  dark: 'red',
};

//Inverted Theme e.g secondary theme
export const invertedTheme = ({ main, dark }) => ({
  main: dark,
  dark: main,
});
