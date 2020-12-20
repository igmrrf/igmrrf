import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../styled/components/Button';
import styled from 'styled-components';
import { Moon, Sun } from 'styled-icons/heroicons-solid';

export const Head = styled.header`
  text-align: center;
  border: 2px solid ${(props) => (props.primary ? 'grey`' : 'black')};
  background: ${(props) => props.theme.ichi};
  color: ${(props) => props.theme.san};
`;

const Header = ({ changeTheme, title }) => {
  const [theme, setTheme] = useState('Light');

  const updateTheme = () => {
    changeTheme();
    if (theme === 'Light') setTheme('Dark');
    else setTheme('Light');
  };
  return (
    <Head>
      {title}
      <Button onClick={updateTheme}>
        {theme === 'Light' ? (
          <Moon size={30} title={'Dark Mode'} />
        ) : (
          <Sun size={30} title={'Light Mode'} />
        )}
      </Button>
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
