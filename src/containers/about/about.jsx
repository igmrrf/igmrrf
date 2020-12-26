import React, { Component, createRef } from 'react';
import { Input } from './about.styles';

class About extends Component {
  constructor(props) {
    super(props);
    this.inputRef = createRef();
  }
  render() {
    return (
      <div>
        <h1>About</h1>
        <Input
          ref={this.inputRef}
          placeholder='Hover to focus'
          onMouseEnter={() => {
            this.inputRef.current.focus();
          }}
        />
        <Input />
      </div>
    );
  }
}
export default About;
