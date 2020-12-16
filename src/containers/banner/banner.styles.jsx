//Theming
import styled from 'styled-components';

export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;

  /*Color the border and text with theme.main */
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.side};
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
  side: 'red',
};

//Inverted Theme e.g secondary theme
export const invertedTheme = ({ main, side }) => ({
  main: side,
  side: main,
});
