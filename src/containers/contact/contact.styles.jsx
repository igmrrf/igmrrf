import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';

//Header
export const Head = styled.header`
  text-align: center;
`;

export const HeaderText = styled.h1`
  text-align: center;
  border: 2px solid ${(props) => (props.primary ? 'grey`' : 'black')};
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
`;

export const Button = styled.button`
  color: palevioletred;
  font-size: 1em;

  
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;

// Extending styles to override some

export const CustomButton = styled(Button)`
  color: red;
  border-color: red;
`;

export const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bolder;
`;

export const Input = styled('input')`
  padding: 0.5em;
  margin: 0.5em;
  color: ${(props) => props.inputColor || 'palevioletred'};
  background: ${(props) => (props.inputMode === 'text' ? 'red' : 'blue')};
  border: none;
  border-radius: 3px;
`;

export const Thing = styled.div.attrs((props) => ({ tabIndex: 0 }))`
  color: blue;

  &:hover {
    color: red;
  }

  & ~ & {
    background: tomato; //Inside the same thing
  }

  & + & {
    background: lime; //Next to the same thing
  }

  &.something {
    background: orange; //With a 'something' class
  }

  .something-else & {
    border: 1px solid; //Inside another element with class .something-else
  }

  .child {
    color: green; //classNames without ampersand are regarded as children
  }
`;

export const ProppedInput = styled.input.attrs((props) => ({
  // we can define static props
  type: 'text',
  //or we can define dynamic ones
  size: props.size || '1em',
}))`
  color: palevioletred;
  font-size: 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;

  /*Using the dynamic computed prop */
  margin: ${(props) => props.size};
  padding: ${(props) => props.size};
`;

export const PasswordInput = styled(ProppedInput).attrs({ type: 'password' })`
  //new values will override old ones
  border: 2px solid aqua;
`;

export const Rotate = styled.div.attrs((props) => ({
  speed: props.speed || 2,
}))`
  display: inline-block;
  animation: ${(props) => props.theme.effects.colorPulse}
    ${(props) => props.speed}s linear infinite;
  animation-duration: infinite;
  animation-delay: '0';
  padding: 2em 1em;
  font-size: 1.2em;
`;

const styles = css`
  animation: ${(props) => props.theme.effects.rotate} 2s linear infinite;
`;

