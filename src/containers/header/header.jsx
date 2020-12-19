import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Head, HeaderText } from './header.styles';

const Header = ({ changeTheme, title }) => {
  const [theme, setTheme] = useState('light');

  const updateTheme = () => {
    changeTheme();
    console.log('Changing icon');
    if (theme === 'light') setTheme('dark');
    else setTheme('light');
    console.log(theme);
  };
  return (
    <Head>
      <HeaderText primary>{title}</HeaderText>
      <button onClick={updateTheme}>{theme}</button>
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
