import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import { GetSiteMetadataQuery } from '../../../codegen/types';

export default ({ children }: { children: JSX.Element | Array<JSX.Element[] | JSX.Element | string> }) => {
  return (
    <StaticQuery
      query={query}
      render={(data: GetSiteMetadataQuery) => (
        <main>
          <header style={{ display: 'flex' }}>
            <Link to='/'>{data.site!.siteMetadata!.title}</Link>
            &nbsp;&nbsp;
            <a href='https://github.com/neverlish/neverlish.me' target='_blank'>github</a>
          </header>
          {children}
        </main>
      )}
    />
  );
};

const query = graphql`
  query GetSiteMetadata {
    site {
      siteMetadata {
        title
      }
    }
  }
`;
