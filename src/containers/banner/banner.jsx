import React from "react";
import { Title } from "../../components/Text/Text";
import { BannerContainer, StyledComponent } from "./banner.styles";
import { Link } from "styled-icons/evaicons-solid";

export default function Banner() {
  return (
    <StyledComponent>
      <Title>
        <code style={{ fontSize: "40px" }}>{"<Igbiriki Francis/>"}</code>
      </Title>
      <BannerContainer>
        <Link />
        <a
          href="https://github.com/igmrrf"
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: "none" }}
        >
          LinkedIn
        </a>
        <a
          href="https://github.com/igmrrf"
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: "none" }}
        >
          Github
        </a>
        <a
          href="https://twitter.com/igmrrf"
          target="_blank"
          rel="noreferrer noopener"
          style={{ textDecoration: "none" }}
        >
          Twitter
        </a>
      </BannerContainer>
    </StyledComponent>
  );
}
