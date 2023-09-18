import styled from "styled-components";

export const StackContainer = styled.div`
  margin: 30px;
  display: flex;
  flex-wrap: wrap;
`;

export const StackContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 2vw;
  margin-bottom: 5vh;
  min-width: 25vw;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.san}A5 0px 8px 24px;
  background: ${(props) => props.theme.ichi};
`;
