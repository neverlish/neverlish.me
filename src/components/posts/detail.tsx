import { graphql } from 'gatsby';
import * as React from 'react';
import { PostDetailQuery } from '../../../codegen/types';
import Layout from '../layout';

export default ({ data: { markdownRemark: post } }: { data: PostDetailQuery }) => {
  return (
    <Layout>
      <div>
        <h1>{post!.frontmatter!.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post!.html! }} />
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
