import React from 'react';
import Tabs from '../../components/Tabs';
import { Title } from '../../components/Text/Text';
import Stack from '../stack/stack';
import { Button, CustomButton } from './projects.styles';
import ProjectData from '../../data/projects';

const ReversedButton = (props) => (
  <Button {...props} children={props.children.split('').reverse()} />
);

export default function Projects() {
  return (
    <div>
      <Title>Projects</Title>
      <Button>Fake Json API</Button>
      <CustomButton as="a" href="https://igmrrf.com">
        MKBHD
      </CustomButton>
      <Tabs>
        {Object.keys(ProjectData).map((data, index) => (
          <Stack label={data} key={index} data={ProjectData[data]} />
        ))}
      </Tabs>
      <CustomButton as={ReversedButton}>Movies</CustomButton>
    </div>
  );
}
