import React from 'react';
import { Color, Colors, Title, StyledComponent } from './banner.styles';

export default function Banner() {
  return (
    <StyledComponent>
      <Title>T-L-D-O</Title>
      <h2>The Lazy Dev Otaku</h2>
      <p>
        I'm a React Developer, Nodejs Developer, Content Creator, Linux
        Administrator and Networking Consultant/Analyst. I'm also currently in
        college studying Mechanical Engineering while working as a freelancer
        and contractor. I'm passionate about MERN stack, Progressive Web Apps,
        Headless CMS, Sustainability, Machine Learning, Neural Networks,
        Artificial Intelligence, S.E.O, Web Performance and Automation. When I'm
        not writing code, you can find me actively on twitter learning, writing
        an article(barely) or watching anime(most likely).
      </p>
      <Colors>
        <Color color={'ichi'}>Ichi</Color>
        <Color color={'ni'}>ni</Color>
        <Color color={'san'}>san</Color>
        <Color color={'yan'}>yan</Color>
      </Colors>
    </StyledComponent>
  );
}
