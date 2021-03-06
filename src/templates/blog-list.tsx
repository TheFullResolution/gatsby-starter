import React from 'react'
import { graphql } from 'gatsby'
import { BlogListQuery, SitePageContext } from '../graphql-types'

interface Props {
  data: BlogListQuery
  pageContext: SitePageContext
}

const BlogListTemplate: React.FC<Props> = ({ data, pageContext }) => {
  const isFirstPage = pageContext.currentPage === 1
  const isLastPage = pageContext.currentPage === pageContext.numPages
  const previousPage =
    pageContext.currentPage - 1 === 1
      ? '/blog'
      : `/blog/${pageContext.currentPage - 1}`
  const nextPage = `/blog/${pageContext.currentPage + 1}`

  return (
    <div>
      <pre>
        <code>
          {JSON.stringify(
            { isFirstPage, isLastPage, previousPage, nextPage },
            null,
            2,
          )}
        </code>
      </pre>
    </div>
  )
}

export default BlogListTemplate

export const query = graphql`
  query BlogList($skip: Int!, $limit: Int!) {
    blogList: allMarkdownRemark(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { contentKey: { eq: "blog" } } }
      limit: $limit
      skip: $skip
    ) {
      edges {
        node {
          id
          frontmatter {
            title
            tags
            date(formatString: "MMMM D, YYYY")
          }
          fields {
            slug
          }
          excerpt(format: MARKDOWN)
        }
      }
    }
  }
`
