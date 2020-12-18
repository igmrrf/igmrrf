import styled, { css } from 'styled-components';

export const StyledButton = styled.div.attrs((props) => ({
  color: props.color || 'blue',
}))`
  background: ${(props) => props.color};
`;

export const StyledLink = css`
  color: 'black';
`;

export const Button = styled.button`
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border-radius: 3px;
  color: ${(props) => props.theme.main};
  border: 2px solid ${(props) => props.theme.dark};
`;
