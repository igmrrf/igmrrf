import React from 'react';
import { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from 'styled-components';
import theme from './styled/theme';
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
  return (
    <div>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header />
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
