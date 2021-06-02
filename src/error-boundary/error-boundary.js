import React from "react";
import {
  ErrorImageContainer,
  ErrorImageText,
  ErrorImageOverlay,
} from "./error-boundary.styles";

class ErrorBoundary extends React.Component {
  constructor() {
    super();
    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    //process the error

    return { hasErrored: true };
  }
  componentDidCatch(error, info) {
    console.log(error);
    console.log(info);
  }
  componentDidMount() {
    console.log("Component has mounted");
  }

  componentWillUnmount() {
    console.log("Component will unmount");
  }

  componentDidUpdate() {
    console.log("Component Did Update");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("Should Component Update");
    return nextProps.text !== this.props.text;
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <ErrorImageOverlay>
          <ErrorImageContainer imageUrl="https://i.imgur.com/yW2W9SC.png" />
          <ErrorImageText>Sorry this page is broken</ErrorImageText>
        </ErrorImageOverlay>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
