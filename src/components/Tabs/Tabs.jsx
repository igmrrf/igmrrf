import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import theme from "../../styled/theme";
import { TabButton, TabList, TabsWrapper } from "./tabs.styles";
// import withRipple from './withRipple';

const TabContent = styled.div`
  flex: 1;
  width: 100%;
`;

const TabPanel = ({ children }) => (
  <TabContent role="tabpanel" tabindex="0">
    {children}
  </TabContent>
);

TabPanel.propTypes = {
  children: PropTypes.any.isRequired,
};

class Tabs extends Component {
  static Panel = TabPanel;

  static propTypes = {
    children: PropTypes.any.isRequired,
    tabBreak: PropTypes.string,
  };

  static defaultProps = {
    tabBreak: "768px",
    theme: theme,
  };

  state = {
    selectedTab: 0,
  };

  selectTab = (tabIndex) => {
    this.setState({ selectedTab: tabIndex });
  };

  render() {
    const { children, tabBreak } = this.props;
    const { selectedTab } = this.state;
    console.log({ theme });

    return (
      <TabsWrapper>
        <TabList breakPoint={tabBreak} role="tablist">
          {React.Children.map(children, ({ props: { label } }, index) => (
            <TabButton
              role="tab"
              selected={selectedTab === index}
              aria-selected={selectedTab === index ? "true" : "false"}
              onClick={() => this.selectTab(index)}
            >
              {label}
            </TabButton>
          ))}
        </TabList>

        <TabContent>
          {React.Children.map(children, (comp, index) =>
            selectedTab === index ? comp : undefined
          )}
        </TabContent>
      </TabsWrapper>
    );
  }
}

export default Tabs;
