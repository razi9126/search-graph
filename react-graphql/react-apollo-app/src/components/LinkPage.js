import React, { Component } from 'react';

//  class LinkPage extends Component {
//     return(
//     	<div>
//     		<h2>sdssa</h2>
//   	</div>
//     )
// }

// const LinkPage = props => (
//   console.log(props.location.postDetail),
//   	<div className="gaadiex-list-item abc">
//       <h2>{props.location.postDetail.singlePost.postTitle}</h2>
//       <p>{props.location.postDetail.singlePost.postSummary}</p>
//       <h6>Tags</h6>
//       <div>
//           {props.location.postDetail.singlePost.tags.map((tag, index) => (
//             <li key = {index}>{tag}</li>
//             ))}
//         </div>

//   </div>
// )
const LinkPage = props => (
  console.log(props),
    <div>
      <h2>{props.postObject.postTitle}</h2>
      <p>{props.postObject.postSummary}</p>
      <h6>Tags</h6>
      <div>
          {props.postObject.tags.map((tag, index) => (
            <li key = {index}>{tag}</li>
            ))}
        </div>

  </div>
)

  export default LinkPage;