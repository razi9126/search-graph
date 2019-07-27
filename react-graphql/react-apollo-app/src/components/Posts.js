import React from 'react'
import { Query } from 'react-apollo'
import gql from 'graphql-tag'

import Post from './Post'

const Posts = () => (
  <Query
    query={gql`
      query {
        myposts {
          postTitle
          postSummary
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <p>Good things take time....</p>
      if (error) {
        return <p>Something went wrong...</p>
      }
      console.log(data)

      return <div className="row">{data.myposts.map(singlePost => <Post post={singlePost} />)}</div>
    }}
  </Query>
)

export default Posts