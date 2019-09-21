import { graphql, Link, StaticQuery } from 'gatsby';
import * as React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import { GetSiteMetadataQuery } from '../../../codegen/types';

const Main = styled.main`
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;

  position: fixed;
  top: 0;
  width: calc(100% - 60px);

  border-bottom: 1px solid #000;
  padding: 10px 0;
  background-color: #fff;

  > a, > div > a {
    text-decoration: none;
    color: #000;
    font-size: 16px;
    font-weight: 600;
    padding: 3px;
    &:hover, &:active {
      background-color: rgba(0, 0, 0, 0.05);
      cursor: pointer;
    }
    margin-right: 5px;
  }
`;

const Body = styled.div`
  padding-top: 20px;
`;

export default ({ children }: { children: React.ReactNode }) => {
  return (
    <StaticQuery
      query={query}
      render={(data: GetSiteMetadataQuery) => {
        const { title } = data.site!.siteMetadata!;
        return <>
          <Helmet title={title!}>

          </Helmet>
          <Main>
            <Header style={{ display: 'flex' }}>
              <Link to='/'>{title}</Link>
              <div>
                <a href='https://github.com/neverlish/neverlish.me' target='_blank'>github</a>
              </div>
            </Header>
            <Body>
              {children}
            </Body>
          </Main>
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
