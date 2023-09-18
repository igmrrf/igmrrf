import React, { useState } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import Banner from "./containers/banner/banner";
import Footer from "./containers/footer/footer";
import Header from "./containers/header/header";
import { darkTheme, lightTheme } from "./styled/theme";
import Projects from "./containers/projects/projects";

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
        transition: "0.5s ease-in",
        background: theme?.ichi,
        color: theme?.yan,
      }}
    >
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Header changeTheme={changeTheme} />
        <Banner />
        <Projects />
        <Footer />
      </ThemeProvider>
    </div>
  );
}
