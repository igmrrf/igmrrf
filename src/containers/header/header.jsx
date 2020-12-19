import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../styled/components/Button';
import styled from 'styled-components';

export const Head = styled.header`
  text-align: center;
  border: 2px solid ${(props) => (props.primary ? 'grey`' : 'black')};
  background: ${(props) => props.theme.ichi};
  color: ${(props) => props.theme.san};
`;

const Header = ({ changeTheme, title }) => {
  const [theme, setTheme] = useState('light');

  const updateTheme = () => {
    changeTheme();
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
 
  };
  return (
    <Head>
      {title}
      <Button onClick={updateTheme}>{theme}</Button>
    </Head>
  );
};

Header.propTypes = {
  changeTheme: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: 'T-L-D-O',
};

export default Header;
