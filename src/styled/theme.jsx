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

const extra = { typography, effects };

export const dark = {
  ichi: "#000C18",
  ni: "#2C7D54",
  san: "#0DFC85",
  yan: "white",
  ...extra,
};

export const light = {
  ichi: "#0DFC85",
  ni: "#800080",
  san: "#FFFFFF",
  yan: "#000C18",
  ...extra,
};
