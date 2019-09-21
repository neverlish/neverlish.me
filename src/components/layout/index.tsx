import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { GetSiteMetadataQuery } from '../../../codegen/types';

export default ({ children }: { children: JSX.Element | Array<JSX.Element[] | JSX.Element | string> }) => {
  return (
    <StaticQuery
      query={query}
      render={(data: GetSiteMetadataQuery) => {
        const { title } = data.site!.siteMetadata!;
        return <>
          <Helmet title={title!}>

          </Helmet>
          <main>
            <header style={{ display: 'flex' }}>
              <Link to='/'>{title}</Link>
              &nbsp;&nbsp;
            <a href='https://github.com/neverlish/neverlish.me' target='_blank'>github</a>
            </header>
            {children}
          </main>
        </>;
      }}
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
