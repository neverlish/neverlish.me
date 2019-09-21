module.exports = {
  siteMetadata: {
    title: `neverlish's blog`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        excerpt_separator: `<!-- end -->`
      }
    },
    `gatsby-plugin-typescript`,
  ],
}
