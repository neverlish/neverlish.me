import * as React from 'react'
import { graphql } from 'gatsby'

export const query = graphql`
  query($link: String!) {
    markdownRemark(fields: { link: { eq: $link } }) {
      html
      frontmatter {
        title
      }
    }
  }
`

interface DetailProps {
  data: {
    markdownRemark: {
      frontmatter: { title: string },
      html: string
    }
  }
}

export default ({ data: { markdownRemark: post } }: DetailProps) => {
  return (
    <div>
      <div>
        <h1>{post.frontmatter.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </div>
    </div>
  )
}