const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

module.exports = {
  onCreateNode: ({ node, getNode, actions }) => {
    if (node.internal.type === `MarkdownRemark`) {
      const slug = createFilePath({ node, getNode, basePath: `posts` }).replace(/^\/\d{4}\/\d{2}\/\d{2}/, '')
      actions.createNodeField({
        node,
        name: `link`,
        value: `/posts${slug}`,
      })
    }
  },
  createPages: async ({ graphql, actions: { createPage } }) => {
    const result = await graphql(`
      {
        allMarkdownRemark {
          edges {
            node {
              fields {
                link
              }
            }
          }
          group(field: {frontmatter: {tags: SELECT}}) {
            tag: fieldValue
          }
        }
      }
    `);
    const posts = result.data.allMarkdownRemark.edges;
    const POSTS_PER_PAGE = 20;
    const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    Array.from({ length: numPages }).forEach((_, i) => {
      createPage({
        path: i === 0 ? `/` : `/page/${i + 1}`,
        component: path.resolve("./src/components/posts/list.tsx"),
        context: {
          limit: POSTS_PER_PAGE,
          skip: i * POSTS_PER_PAGE,
          numPages,
          currentPage: i + 1,
        },
      })
    });
    result.data.allMarkdownRemark.group.forEach(({ tag }) => {
      createPage({
        path: `/tags/${tag}`,
        component: path.resolve('./src/components/tags/detail.tsx'),
        context: {
          tag,
        },
      });
    });
    posts.forEach(({ node }) => {
      createPage({
        path: node.fields.link,
        component: path.resolve(`./src/components/posts/detail.tsx`),
        context: {
          link: node.fields.link,
        },
      })
    })
  }
}