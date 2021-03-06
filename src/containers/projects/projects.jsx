import React from 'react';
import { Button, CustomButton } from './projects.styles';

const ReversedButton = (props) => (
  <Button {...props} children={props.children.split('').reverse()} />
);

export default function Projects() {
  return (
    <div>
      <h1>Projects</h1>
      <Button>Fake Json API</Button>
      <CustomButton as='a' href='https://igmrrf.com'>
        MKBHD
      </CustomButton>
      <CustomButton as={ReversedButton}>Movies</CustomButton>
    </div>
  );
}
