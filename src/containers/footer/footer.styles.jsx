import styled from 'styled-components';

export const Foot = styled.footer`
  display: flex;
  justify-content: space-between;
  padding: 0 5vw;
  min-height: 10vh;
  align-items: center;
  transition: 0.5s ease-in;
  background: ${(props) => props.theme.ichi};
  color: ${(props) => props.theme.san};
  box-shadow: 0 4px 12px -4px ${(props) => props.theme.san};
`;
