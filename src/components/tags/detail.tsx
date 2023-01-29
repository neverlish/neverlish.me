import { graphql } from 'gatsby';
import * as React from 'react';
import { GetPostsByTagQuery } from '../../../codegen/types';
import SmallLink from '../../atoms/SmallLink';
import Title from '../../atoms/Title';
import Layout from '../../components/layout';
import PostList from '../../templates/PostList';

export default ({ data, pageContext: { tag } }: { data: GetPostsByTagQuery, pageContext: { tag: string } }) => (
  <Layout>
    <Title h1={`#${tag}`} />
    <PostList posts={data.allMarkdownRemark!.edges!} />
    <SmallLink to='/tags' label='all tags' />
  </Layout>
);

export const query = graphql`
  fragment PostListItem on MarkdownRemarkEdge {
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

  query GetPostsByTag($tag: String) {
    allMarkdownRemark(
      sort: {frontmatter: {date: DESC}}
      filter: {frontmatter: {tags: {in: [$tag]}}}
    ) {
      edges {
        ...PostListItem
      }
    }
  }
`;
