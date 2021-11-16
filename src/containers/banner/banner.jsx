import React from "react";
import { Color, Colors, StyledComponent } from "./banner.styles";
import { Title } from "../../styled/components/Text";

export default function Banner() {
  return (
    <StyledComponent>
      <Title>T-L-D-O </Title>
      <h2>The Lazy Dev Otaku</h2>
      <p>
        MERN Stack Developer, Analyst and Cryptocurrency Enthusiast. Mechanical
        Engineering (recent grad) while working as a freelancer and contract
        developer. I'm passionate about the MERN stack, Progressive Web Apps,
        Headless CMS, Sustainability, Machine Learning, Neural Networks,
        Artificial Intelligence, S.E.O, Web Performance and Automation. When I'm
        not writing code, you can find me actively on twitter, writing an
        article(barely) or watching anime(most likely).
      </p>
      <Colors>
        <Color color={"ichi"}>Ichi</Color>
        <Color color={"ni"}>ni</Color>
        <Color color={"san"}>san</Color>
        <Color color={"yan"}>yan</Color>
      </Colors>
    </StyledComponent>
  );
}
