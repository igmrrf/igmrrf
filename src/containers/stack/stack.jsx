import React from "react";
import { StackContainer, StackContent } from "./stack.styles";
import { CustomButton } from "../projects/projects.styles";
import Button from "../../components/Button/Button";

const Stack = ({ data = [] }) => {
  console.log(data);
  return (
    <StackContainer>
      {data.map((code, index) => (
        <StackContent key={index}>
          <h2 style={{ margin: "10px auto" }}>{code.name}</h2>
          <img
            src="https://picsum.photos/200/300"
            width={300}
            height={300}
            alt={code.name}
          />

          <div style={{ margin: 10 }}>
            <CustomButton as="a" href={code.githubUrl}>
              {true && "<Code/>"}
            </CustomButton>
          </div>
          <div>
            <CustomButton as="a" target="_blank" href={code.previewUrl}>
              Preview
            </CustomButton>
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "300px",
              flexWrap: "wrap",
            }}
          >
            {code.stack.length &&
              code.stack.map((each, i) => <Button index={i}>{each}</Button>)}
          </div>
        </StackContent>
      ))}
    </StackContainer>
  );
};

export default Stack;
