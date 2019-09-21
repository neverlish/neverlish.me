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
    `)
    result.data.allMarkdownRemark.edges.forEach(({ node }) => {
      actions.createPage({
        path: node.fields.link,
        component: path.resolve(`./src/pages/posts/detail.tsx`),
        context: {
          link: node.fields.link,
        },
      })
    })
  }
}