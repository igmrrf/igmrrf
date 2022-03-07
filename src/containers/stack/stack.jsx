import React from 'react';

const Stack = ({ data = [] }) => {
  console.log(data);
  return (
    <div>
      {data.map((code, index) => (
        <div
          key={index}
          style={{ border: '2px solid red', margin: '20px 10px' }}
        >
          <h4>Name: {code.name}</h4>
          <h4>Github Url: {code.githubUrl}</h4>
          <h4>Preview Url: {code.previewUrl}</h4>
          <h4>Stack: {code.stack[0]}</h4>
        </div>
      ))}
    </div>
  );
};

export default Stack;
