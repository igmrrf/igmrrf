import React, { useState } from 'react';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import About from './containers/about/about';
import Banner from './containers/banner/banner';
import Contact from './containers/contact/contact';
import Footer from './containers/footer/footer';
import Header from './containers/header/header';
import Projects from './containers/projects/projects';
import Stack from './containers/stack/stack';
import { darkTheme, lightTheme } from './styled/theme';

const GlobalStyle = createGlobalStyle`
 * {
   margin:0;
   padding:0;
   box-sizing:border-box;
 }
`;

export default function App() {
  const [theme, setTheme] = useState(darkTheme);

  const changeTheme = () => {
    if (theme === lightTheme) setTheme(darkTheme);
    else setTheme(lightTheme);
  };

  return (
    <div
      style={{
        transition: '0.5s ease-in',
        background: theme?.ichi,
        color: theme?.yan,
      }}
    >
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header changeTheme={changeTheme} />
        <Banner />
        <About />
        <Stack />
        <Projects />
        <Contact />
        <Footer />
      </ThemeProvider>
    </div>
  );
}
