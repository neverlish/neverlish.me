import { graphql } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import { PostDetailQuery } from '../../../codegen/types';
import Layout from '../layout';

const Title = styled.h1`
  font-size: 30px;
  text-align: center;
  border-bottom: 2px solid black;
  margin-bottom: 30px;
`;

const Body = styled.div`
  font-size: 14px;
  > :not(div) {
    padding-top: 5px;
    padding-bottom: 5px;

    &:hover, &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
`;

export default ({ data: { markdownRemark: post } }: { data: PostDetailQuery }) => {
  return (
    <Layout>
      <div>
        <Title>{post!.frontmatter!.title}</Title>
        <Body dangerouslySetInnerHTML={{ __html: post!.html! }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PostDetail ($link: String!) {
    markdownRemark(fields: { link: { eq: $link } }) {
      html
      frontmatter {
        title
      }
    }
  }
`;
