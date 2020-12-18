import styled, { css } from 'styled-components';

export const StyledButton = styled.div.attrs((props) => ({
  color: props.color || 'blue',
}))`
  background: ${(props) => props.color};
`;

export const StyledLink = css`
  color: 'black';
`;
