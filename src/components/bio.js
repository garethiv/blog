import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"
import { Link } from "gatsby"
import { rhythm } from "../utils/typography"

const Bio = ({ location }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/profile-pic2.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author } = data.site.siteMetadata
  if (location.pathname === rootPath) { 
    return (
    <div
      style={{
        display: `flex`,
        marginBottom: rhythm(0),
      }}
    >
      <p>
        {author.summary}
        {` `}
      </p>
    </div>
  )
  } else { 
    return (
      <div
      style={{
        display: `flex`,
        marginBottom: rhythm(1.0),
      }}
    ><Link to={`/`} style={{ boxShadow: `none` }}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          marginRight: rhythm(1 / 2),
          marginBottom: 0,
          minWidth: 50,
          borderRadius: `100%`,
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      </Link>
      <p>
        {author.summary}
        {` `}
      </p>
    </div>
    )
  }
}

export default Bio
