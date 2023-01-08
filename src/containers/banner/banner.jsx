import React from 'react';
import { Title } from '../../components/Text/Text';
import { StyledComponent } from './banner.styles';

export default function Banner() {
  return (
    <StyledComponent>
      <Title>Igbirki Francis</Title>

      <p>
        First and foremost a JavaScript Developer then a Cryptocurrency
        Enthusiat and Analyst. Mechanical Engineering (recent grad), currently
        in search of a role as a remote developer (Frontend or Backend) and
        working as a freelancer developer. I'm passionate about the MERN stack,
        Progressive Web Apps, Headless CMS, Machine Learning, Neural Networks,
        Artificial Intelligence, S.E.O, Web Performance and Automation. When I'm
        not writing code, you can find me actively on twitter, writing an
        article(barely) or watching anime(most likely).
      </p>
      <a href='https://github.com/igmrrf'>Github</a>
      <a href='https://github.com/igmrrf'>Twitter</a>

      {/* <Colors>
        <Color color={'ichi'}>Ichi</Color>
        <Color color={'ni'}>ni</Color>
        <Color color={'san'}>san</Color>
        <Color color={'yan'}>yan</Color>
      </Colors> */}
    </StyledComponent>
  );
}
