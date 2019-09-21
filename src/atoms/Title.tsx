import * as React from 'react';
import styled from 'styled-components';

const Title = styled.div`
  > h1 {
    font-size: 30px;
    text-align: center;
  }
  border-bottom: 2px solid black;
`;

export default ({ h1, children }: { h1: string, children?: React.ReactNode }) => (
  <Title>
    <h1>{h1}</h1>
    {children}
  </Title>
);