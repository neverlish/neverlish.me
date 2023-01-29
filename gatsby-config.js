module.exports = {
  siteMetadata: {
    title: `neverlish's blog`
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/posts/`,
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
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "G-N8BF32V3TT",
        head: true,
        cookieDomain: "neverlish.me",
      }
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-table-of-contents`,
            options: {
              exclude: "Table of Contents",
              tight: false,
              ordered: false,
              fromHeading: 1,
              toHeading: 6,
              className: "table-of-contents"
            },
          },
          `gatsby-remark-autolink-headers`
        ],
      },
    },
  ],
}
