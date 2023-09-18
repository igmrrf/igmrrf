import React from "react";
import Tabs from "../../components/Tabs";
import { Title } from "../../components/Text/Text";
import Stack from "../stack/stack";
import { Button, CustomButton, ProjectsContainer } from "./projects.styles";
import ProjectData from "../../data/projects";

const ReversedButton = (props) => (
  <Button {...props} children={props.children.split("").reverse()} />
);

export default function Projects() {
  return (
    <ProjectsContainer>
      <Title>Projects</Title>
      <Tabs>
        {Object.keys(ProjectData).map((data, index) => (
          <Stack label={data} key={index} data={ProjectData[data]} />
        ))}
      </Tabs>
      <CustomButton as={ReversedButton}>Reverse</CustomButton>
    </ProjectsContainer>
  );
}
