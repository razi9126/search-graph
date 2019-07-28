import React from 'react'
import './Post.css';

// const Post = props => (
//   <div className="card col-sm-3">
//     <div className="card-body">
//       <h5 className="card-title">{props.post.postTitle}</h5>
//       <h6 className="card-subtitle mb-2 text-muted">{props.post.postSummary}</h6>
//     </div>
//   </div>
// )
const Post = props => (
  <div className="gaadiex-list-item">
     <h6><a href={props.post.link}>{props.post.postTitle}</a></h6>
    <p> {props.post.postSummary}</p>
	</div>
)

export default Post