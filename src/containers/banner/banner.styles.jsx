//Theming
import styled from "styled-components";

export const StyledComponent = styled.div`
  padding: 5vh 5vw;
`;
export const Title = styled.h1`
  text-align: center;
`;

export const Colors = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Color = styled.div.attrs((props) => ({
  color: props.color,
}))`
  background-color: ${(props) => props.theme[props.color]};
  height: 50px;
  width: 50px;
  margin: 20px;
  border: 2px solid
    ${(props) =>
      props.theme[props.color] === props.theme.yan
        ? props.theme.yan
        : props.theme.ichi};
  color: ${(props) =>
    props.theme[props.color] === props.theme.yan
      ? props.theme.ichi
      : props.theme.yan};
`;
