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
        excerpt_separator: `<!-- end -->`,
        plugins: [
          `gatsby-remark-prismjs`
        ],
      }
    },
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'G-N8BF32V3TT',
        head: true
      }
    }
  ],
}
