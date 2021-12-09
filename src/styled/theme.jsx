import { rotate, pulse, colorPulse } from "./effects";

const effects = {
  rotate,
  pulse,
  colorPulse,
};
const typography = {
  h1: "2em",
  h2: "2em",
  h3: "2em",
  h4: "2em",
  h5: "2em",
  h6: "2em",
};
const fonts = {
  h1: "2em",
  h2: "2em",
  h3: "2em",
  h4: "2em",
  h5: "2em",
  h6: "2em",
};

const theme = {
  main: "#00FF66",
  dark: "darkblue",
  light: "lightblue",
  typography,
  effects,
};

export const darkTheme = {
  ichi: "#000C18",
  ni: "#2C7D54",
  san: "#0DFC85",
  yan: "white",
  typography,
  effects,
};
export const lightTheme = {
  ichi: "white",
  ni: "#0DFC85",
  san: "#2C7D54",
  yan: "#000C18",
  typography,
  effects,
  fonts,
};

export default theme;
