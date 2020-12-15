import React from 'react';
import Header from './containers/header/header';
import Banner from './containers/banner/banner';
import About from './containers/about/about';
import Stack from './containers/stack/stack';
import Projects from './containers/projects/projects';
import Contact from './containers/contact/contact';
import Footer from './containers/footer/footer';

export default function App() {
  return (
    <div>
      <Header />
      <Banner />
      <About />
      <Stack />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}
