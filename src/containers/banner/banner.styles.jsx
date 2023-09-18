//Theming
import styled from "styled-components";

export const StyledComponent = styled.div`
  // background-color: ${(props) => props.theme.ichi};
  // // background-image: url("/light.png");
  // // background-size: 400px 200px;
  // // background-repeat: no-repeat;
  // // background-position: center;
  padding: 5vh 5vw;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Colors = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const BannerContainer = styled.main`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
export const Color = styled.div.attrs((props) => ({
  color: props.color,
}))`
  background-color: ${(props) => props.theme[props.color]};
  height: 50px;
  width: 50px;
  margin: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
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
