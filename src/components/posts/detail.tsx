import { graphql } from 'gatsby';
import * as React from 'react';
import { PostDetailQuery } from '../../../codegen/types';

export default ({ data: { markdownRemark: post } }: { data: PostDetailQuery }) => {
  return (
    <div>
      <div>
        <h1>{post!.frontmatter!.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post!.html! }} />
      </div>
    </div>
  )
}

export const query = graphql`
  query PostDetail ($link: String!) {
    markdownRemark(fields: { link: { eq: $link } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

