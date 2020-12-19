import React from 'react';
import PropTypes from 'prop-types';
import { Head, HeaderText } from './header.styles';

const Header = ({ changeTheme, title }) => (
  <Head>
    <HeaderText primary>{title}</HeaderText>
    <button onClick={changeTheme}>Change Theme</button>
  </Head>
);

Header.propTypes = {
  changeTheme: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

Header.defaultProps = {
  title: 'T-L-D-O',
};

export default Header;
