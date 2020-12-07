import './assets/css/style.css';
import test from './assets/js/test';
import './assets/js/effects/scrolling';
import Typed from 'typed.js';

var options = {
  strings: [
    'Mechanical ^1000 Engineer',
    'React  ^1000 Engineer.',
    'Nodejs ^1000 Developer',
    'Django  ^1000 Developer',
  ],
  typeSpeed: 100,
};

var typed = new Typed('#typed-text', options);

//Method Parameter Validation
const isRequired = () => {
  throw new Error('Param is required');
};

const print = (num = isRequired()) => {
  console.log(`printing ${num}`);

  console.log('bored');
};

// console.log(summary);
