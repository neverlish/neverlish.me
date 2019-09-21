import { Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';

const SmallLink = styled.li`
  > a {
    color: #000;
    font-size: 13px;
    padding: 3px;
  }
  list-style-type: none;
  padding: 0;
  :hover, :active {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default ({ to, label }: { to: string, label: string }) => (
  <SmallLink>
    <Link to={to}>
      {label}
    </Link>
  </SmallLink>
);
