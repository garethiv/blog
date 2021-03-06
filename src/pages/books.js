import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

const PostsByDate = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  // get all unique tags from each post
  let tags = []
  posts.forEach((post, _) => {
    if (post.node.frontmatter.tags) {
      tags = tags.concat(post.node.frontmatter.tags)
    }
  })

  const getUnique = arrArg => {
    return arrArg.filter((elem, pos, arr) => {
      return arr.indexOf(elem) === pos
    })
  }

  tags = getUnique(tags)

  return (
    <Layout location={location} title={siteTitle}>
        <SEO title="Index" />
        <div style={{  }}>
            <h3>Books</h3>
        </div>
        <p>
        <Link style={{ boxShadow: `none` }} to={'/books-by-date'}>→ Sort by date</Link>
        </p>
        <p>
        <Link style={{ boxShadow: `none` }} to={'/genre/fiction'}>→ Fiction</Link>
        </p>
        <p>
        <Link style={{ boxShadow: `none` }} to={'/genre/military-history'}>→ Military History</Link>
        </p>
        <p>
        This page shares notes i've taken from some of the more recent books i've read. These are not intended to be book reviews/essays, just some rough thoughts, serving as a reference, and useful if for comparing ideas or opinions. I've given each a rating out of 10 on how likely I am to recommend it to others.
        </p>

        <p>
        Notes are sorted by rating in descending order.
        </p>





        <ul>
        {posts.map(({ node }) => {
          const { slug } = node.fields
          const { title } = node.frontmatter
          return (
            <ol key={slug}>
              <Link to={slug}>{title}</Link>
              <br/>
          <small>{node.frontmatter.date} • {node.frontmatter.minread} min read <span role="img" aria-label="coffee">☕</span> • Rating: {node.frontmatter.rating}/10</small>
            </ol>
          )
        })}
      </ul>
    </Layout>
  )
}
  
export default PostsByDate

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      sort: { fields: [frontmatter___rating], order: DESC }
      filter: { frontmatter: { type: { in: ["book"] } } }
      ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            tags
            minread
            rating
          }
        }
      }
    }
  }
`
