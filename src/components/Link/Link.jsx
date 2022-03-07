import styled from 'styled-components';

export const StyledButton = styled.div.attrs((props) => ({
  color: props.color || 'blue',
}))`
  background: ${(props) => props.color};
`;
