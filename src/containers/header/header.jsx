import PropTypes from 'prop-types';
import React, { useState } from 'react';
import styled from 'styled-components';
import { Moon, Sun } from 'styled-icons/heroicons-solid';
import Button from '../../components/Button/Button';

export const Head = styled.header`
  display: flex;
  justify-content: space-between;
  padding: 0 5vw;
  min-height: 10vh;
  align-items: center;
  transition: 0.5s ease-in;
  background: ${(props) => props.theme.ichi};
  color: ${(props) => props.theme.san};
  box-shadow: 0 4px 12px -4px ${(props) => props.theme.san};
`;

const Header = ({ changeTheme, title }) => {
  const [theme, setTheme] = useState('Dark');

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
