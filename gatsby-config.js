module.exports = {
  siteMetadata: {
    title: "freevacy",
    author: "Heri Setiawan",
    description: "Freevacy | Tips menjaga privacy mu didunia maya.",
    siteUrl: "https://freevacy.gatsbyjs.io",
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: `blog`,
        path: `${__dirname}/assets/blog`,
      }
    },
    {
    resolve: `gatsby-plugin-mdx`,
    options: {
      extensions: [`.md`, `.mdx`],
    },
    },
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-plugin-sitemap",
      options: {
        query: `
        {
          site {
          siteMetadata {
            siteUrl
          }
        }
        allSitePage {
          edges {
            node {
              path
            }
          }
        }
      }
      `,
        serialize: ({ site, allSitePage }) =>
          allSitePage.edges.map(edge => {
            return {
              url: site.siteMetadata.siteUrl + edge.node.path,
              changefreq: `daily`,
              priority: 0.7,
            }
        }),
        excludes: [
                `/dev-404-page`,
                `/404`,
                `/404.html`,
                `/offline-plugin-app-shell-fallback`,
                `/my-excluded-page`,
                /(\/)?hash-\S*/, // you can also pass valid RegExp to exclude internal tags for example
        ],
        output: "./path/to/sitemap.xml",
      }
    },
  ],
};
