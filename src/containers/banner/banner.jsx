import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Button, theme, invertedTheme, Color } from './banner.styles';

export default function Banner() {
  return (
    <div>
      <h1>Banner</h1>
      <Button>Not Theme</Button>
      <ThemeProvider theme={theme}>
        <Button>Themed</Button>
        <ThemeProvider theme={invertedTheme}>
          <Button>Inverted Theme</Button>
        </ThemeProvider>
        <Color color={'ichi'}>Primary: Ichi</Color>
        <Color color={'ni'}>Secondary: ni</Color>
        <Color color={'san'}>Tertiary: san</Color>
        <Color color={'yan'}>Complimentary: yan</Color>
      </ThemeProvider>
    </div>
  );
}
