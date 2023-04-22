import React from 'react';
import { Title } from '../../components/Text/Text';
import { StyledComponent } from './banner.styles';

export default function Banner() {
  return (
    <StyledComponent>
      <Title>
        <code style={{ fontSize: '40px' }}>{'<Igbiriki Francis/>'}</code>
      </Title>

      <main
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: '20px',
        }}
      >
        <a
          href='https://github.com/igmrrf'
          target='_blank'
          rel='noreferrer noopener'
          style={{ textDecoration: 'none' }}
        >
          Github
        </a>
        <a
          href='https://twitter.com/igmrrf'
          target='_blank'
          rel='noreferrer noopener'
          style={{ textDecoration: 'none' }}
        >
          Twitter
        </a>
      </main>

      {/* <Colors>
        <Color color={'ichi'}>Ichi</Color>
        <Color color={'ni'}>ni</Color>
        <Color color={'san'}>san</Color>
        <Color color={'yan'}>yan</Color>
      </Colors> */}
    </StyledComponent>
  );
}
