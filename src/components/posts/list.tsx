import { graphql, Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import { GetPostListQuery } from '../../../codegen/types';
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

const PostLiteItem = styled.section`
  color: #000;
  padding: 10px;
  > div {
    display: flex;
    justify-content: space-between;
    > strong {
      font-weight: 700;
      text-decoration: underline;
    }
    > span {
      font-size: 12px;
    }
  }
  &:hover, &:active {
    background-color: rgba(0, 0, 0, 0.05);
  }
`;

export default ({ data, pageContext: { currentPage, numPages } }: IPostListProps) => {
  const prevPage = currentPage - 1 === 1 ? '/' : `/page/${(currentPage - 1)}`;
  return (
    <Layout>
      {data.allMarkdownRemark!.edges.map(({ node }) => {
        const frontmatter = node.frontmatter!;
        return <Link to={node.fields!.link!} key={node.id} style={{ textDecoration: 'none' }}>
          <PostLiteItem>
            <div>
              <strong>{frontmatter.title}</strong>
              <span>
                {frontmatter.date}
              </span>
            </div>
            <p>{node.excerpt}</p>
          </PostLiteItem>
        </Link>;
      })}
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
        node {
          id
          frontmatter {
            title
            date(formatString: "YYYY.MM.DD.")
          }
          excerpt
          fields {
            link
          }
        }
      }
    }
  }
`;
