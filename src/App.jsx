import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './styled/theme';
import Header from './containers/header/header';
import Banner from './containers/banner/banner';
import About from './containers/about/about';
import Stack from './containers/stack/stack';
import Projects from './containers/projects/projects';
import Contact from './containers/contact/contact';
import Footer from './containers/footer/footer';

const GlobalStyle = createGlobalStyle`
 * {
   margin:0;
   padding:0;
   box-sizing:border-box;
 }
`;

export default function App() {
  const [theme, setTheme] = useState(lightTheme);

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
