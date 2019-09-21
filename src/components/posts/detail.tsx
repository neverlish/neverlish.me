import { graphql } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import { PostDetailQuery } from '../../../codegen/types';
import SmallLink from '../../atoms/SmallLink';
import Title from '../../atoms/Title';
import Layout from '../layout';

const Body = styled.div`
  font-size: 13px;
  > :not(div) {
    padding-top: 5px;
    padding-bottom: 5px;
    line-height: 2.0;

    &:hover, &:active {
      background-color: rgba(0, 0, 0, 0.05);
    }
  }
  & a {
    color: #000;
  }
`;

export default ({ data: { markdownRemark: post } }: { data: PostDetailQuery }) => {
  const { title, tags } = post!.frontmatter!;
  return (
    <Layout>
      <div>
        <Title h1={title!}>
          {tags && <ul>{tags.map((tag) => <SmallLink key={tag!} to={`/tags/${tag}`} label={`#${tag}`} />)}</ul>}
        </Title>
        <Body dangerouslySetInnerHTML={{ __html: post!.html! }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query PostDetail ($link: String!) {
    markdownRemark(fields: {link: {eq: $link } }) {
      html
      frontmatter {
        title
        tags
      }
    }
  }
`;
