import styled from 'styled-components';

export const Head = styled.header`
  text-align: center;
`;

export const HeaderText = styled.h1`
  text-align: center;
  border: 2px solid ${(props) => (props.primary ? 'grey`' : 'black')};
  background: ${(props) => (props.primary ? 'black' : 'white')};
  color: ${(props) => (props.primary ? 'white' : 'black')};
`;
