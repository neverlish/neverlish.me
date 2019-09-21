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
  createPages: async ({ graphql, actions }) => {
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
        }
      }
    `);
    const posts = result.data.allMarkdownRemark.edges;
    const POSTS_PER_PAGE = 5;
    const numPages = Math.ceil(posts.length / POSTS_PER_PAGE);
    Array.from({ length: numPages }).forEach((_, i) => {
      actions.createPage({
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
    posts.forEach(({ node }) => {
      actions.createPage({
        path: node.fields.link,
        component: path.resolve(`./src/components/posts/detail.tsx`),
        context: {
          link: node.fields.link,
        },
      })
    })
  }
}