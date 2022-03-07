import React from "react";
import { Title } from "../../components/Text/Text";
import { Container } from "../../styled/layout";
import {
  Input,
  Thing,
  ProppedInput,
  PasswordInput,
  Rotate,
} from "./contact.styles";

export default function Contact() {
  return (
    <Container>
      <Title>Contact</Title>
      <Input defaultValue="@probablyUp" inputMode="text" />
      <Input defaultValue="" inputMode="text" />
      <Thing>Hello World</Thing>

      <Thing>How ya doing</Thing>
      <Thing className="something">The sun is shining</Thing>
      <div>Pretty nice day though</div>
      <Thing>Don't you think?</Thing>
      <div className="something-else">
        <Thing>Splendid</Thing>
      </div>
      <Thing>
        <label className="child">This is a child</label>
      </Thing>
      <ProppedInput placeholder="Normal Size" />
      <ProppedInput placeholder="smaller size" size="0.5em" />
      <ProppedInput placeholder="Bigger size" size="2em" />
      <PasswordInput defaultValue="Normal" />
      <PasswordInput defaultValue="Small" size="0.2em" />
      <PasswordInput defaultValue="Big" size="2em" />
      <Rotate speed={"5"}>slower</Rotate>
      <Rotate>normal</Rotate>
      <Rotate speed="1">faster</Rotate>
    </Container>
  );
}
