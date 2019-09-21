import { Link } from 'gatsby';
import * as React from 'react';
import styled from 'styled-components';
import { MarkdownRemarkEdge } from '../../codegen/types';

const PostListItem = styled.section`
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

export default ({ posts }: { posts: MarkdownRemarkEdge[] }) => (
  posts.map(({ node }) => {
    const frontmatter = node.frontmatter!;
    return <Link to={node.fields!.link!} key={node.id} style={{ textDecoration: 'none' }}>
      <PostListItem>
        <div>
          <strong>{frontmatter.title}</strong>
          <span>
            {frontmatter.date}
          </span>
        </div>
        <p>{node.excerpt}</p>
      </PostListItem>
    </Link>;
  })
);
