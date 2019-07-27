import React from 'react'

const Post = props => (
  <div className="card col-sm-3">
    <div className="card-body">
      <h5 className="card-title">{props.post.postTitle}</h5>
      <h6 className="card-subtitle mb-2 text-muted">{props.post.postSummary}</h6>
    </div>
  </div>
)

export default Post