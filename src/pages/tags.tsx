import { graphql } from 'gatsby';
import * as React from 'react';
import { AllTagsQuery } from '../../codegen/types';
import SmallLink from '../atoms/SmallLink';
import Layout from '../components/layout';

export default ({ data }: { data: AllTagsQuery }) => (
  <Layout>
    <ul>
      {data.allMarkdownRemark!.group.map(({ tag }) => (
        <SmallLink
          key={tag!}
          to={`/tags/${tag}`}
          label={`#${tag}`}
        />
      ))}
    </ul>
  </Layout>
);

export const query = graphql`
  query AllTags {
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        tag: fieldValue
      }
    }
  }
`;
