import styled from "styled-components";
import { Link } from "react-router-dom";

export const Button = styled.button`
  color: palevioletred;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
  cursor: pointer;
`;

// Extending styles to override some
export const ProjectsContainer = styled.div`
  padding: 0 5vw;
`;
export const CustomButton = styled(Button)`
  color: red;
  border-color: red;
`;

export const StyledLink = styled(Link)`
  color: palevioletred;
  font-weight: bolder;
`;
