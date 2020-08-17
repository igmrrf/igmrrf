import "./assets/css/style.css";
import test from "./assets/js/test";
import "./assets/js/effects/scrolling";

//Method Parameter Validation
const isRequired = () => {
  throw new Error("Param is required");
};

const print = (num = isRequired()) => {
  console.log(`printing ${num}`);
};

// console.log(summary);
