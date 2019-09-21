import { graphql, Link } from 'gatsby';
import * as React from 'react';
import { IndexPageQuery } from '../../codegen/types';
import Layout from '../components/layout';

export default ({ data }: { data: IndexPageQuery }) => {
  return (
    <Layout>
      <h4>{data.allMarkdownRemark!.totalCount} Posts</h4>
      {data.allMarkdownRemark!.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields!.link!}>
            <h3>
              {node.frontmatter!.title} — {node.frontmatter!.date}
            </h3>
          </Link>
          <p>{node.excerpt}</p>
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query IndexPage {
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
  }
`;
