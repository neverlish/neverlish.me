import { graphql, Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import { GetPostListQuery } from '../../../codegen/types';
import PostList from '../../templates/PostList';
import Layout from '../layout';

interface IPostListProps {
  data: GetPostListQuery;
  pageContext: {
    limit: number;
    skip: number;
    numPages: number;
    currentPage: number;
  };
}

const Pagination = styled.section`
  border-top: 1px solid #000;
  padding-top: 10px;
  margin-top: 10px;
  > a {
    margin-right: 5px;
  }
`;

export default ({ data, pageContext: { currentPage, numPages } }: IPostListProps) => {
  const prevPage = currentPage - 1 === 1 ? '/' : `/page/${(currentPage - 1)}`;
  return (
    <Layout>
      <PostList posts={data.allMarkdownRemark!.edges!} />
      <Pagination>
        {currentPage !== 1 &&
          <Link to={prevPage}>prev</Link>}
        {currentPage !== numPages &&
          <Link to={`/page/${(currentPage + 1)}`}>next</Link>}
      </Pagination>
    </Layout>
  );
};

export const query = graphql`
  query GetPostList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      limit: $limit
      skip: $skip
    ) {
      edges {
        ...PostListItem
      }
    }
  }
`;
