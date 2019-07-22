import * as React from 'react'
import { graphql, Link } from 'gatsby';

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          excerpt
          fields {
            link
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

interface IndexProps {
  data: {
    site: {
      siteMetadata: {
        title: string
      }
    }
    allMarkdownRemark: {
      totalCount: number
      edges: Array<{
        node: {
          frontmatter: {
            title: string;
            date: string;
          }
          id: string;
          fields: {
            link: string;
          }
          excerpt: string;
        }
      }>
    }
  }
}

export default ({ data }: IndexProps) => {
  return (
    <div>
      {data.site.siteMetadata.title}
      <h4>{data.allMarkdownRemark.totalCount} Posts</h4>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.link}>
            <h3>
              {node.frontmatter.title} — {node.frontmatter.date}
            </h3>
          </Link>
          <p>{node.excerpt}</p>
        </div>
      ))}
    </div>
  )
}
