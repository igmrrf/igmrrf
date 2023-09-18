import styled from "styled-components";

export const TabsWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const TabButton = styled.button`
  flex: 1;
  height: 50px;
  padding: 0px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  cursor: default;
  background: transparent;
  outline: none;
  transition: border-color 0.2s ease-in;
  border: none;
  text-transform: capitalize;
  color: ${(props) => props.theme.san};
  border-bottom: 2px solid
    ${(props) => (props.selected ? props.theme.san : "#fff")};
  &:hover,
  &:focus,
  &:active {
    border-bottom: 2px solid
      ${(props) => (props.selected ? props.theme.san : "#fff")};
  }
`;

export const TabList = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  @media (max-width: ${(props) => props.breakPoint}) {
    flex-direction: column;
    & > div,
    & > div > button {
      width: 100%;
    }
  }
`;

export const TabContent = styled.div`
  flex: 1;
  width: 100%;
  padding-top: 16px;
`;
