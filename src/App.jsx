import React, { useState, useEffect, Suspense, lazy } from "react";
import { createGlobalStyle } from "styled-components";
import { ThemeProvider } from "styled-components";
import { light, dark } from "./styled/theme";
import Header from "./containers/header/header";
import Banner from "./containers/banner/banner";
import About from "./containers/about/about";
import Stack from "./containers/stack/stack";
import Projects from "./containers/projects/projects";
import Footer from "./containers/footer/footer";
import ErrorBoundary from "./error-boundary/error-boundary";
import LoadingScreen from "./containers/loading/screen";
import Contact from "./containers/contact/contact";
const GlobalStyle = createGlobalStyle`
 * {
   margin:0;
   padding:0;
   box-sizing:border-box;
 }
`;

export default function App() {
  const [theme, setTheme] = useState(light);

  const changeTheme = () => {
    if (theme === light) setTheme(dark);
    else setTheme(light);
    localStorage.setItem("TLDO", JSON.stringify(theme));
  };
  useEffect(() => {
    const savedTheme = localStorage.getItem("TLDO");
    if (savedTheme) setTheme(JSON.parse(savedTheme));
  }, []);

  return (
    <div
      style={{
        transition: "0.5s ease-in",
        background: theme?.ichi,
        color: theme?.yan,
      }}
    >
      <ErrorBoundary>
        <Suspense fallback={<LoadingScreen />}>
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
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
