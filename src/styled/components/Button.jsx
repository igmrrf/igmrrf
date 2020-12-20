import styled from 'styled-components';

export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1.5em;
  border-radius: 3px;
  color: ${(props) => props.theme.ichi};
  border: 2px solid ${(props) => props.theme.san};
  background: ${(props) => props.theme.san};
`;

export const StyledButton = styled.div.attrs((props) => ({
  color: props.color || 'blue',
}))`
  background: ${(props) => props.color};
`;

export default Button;
