import React from 'react'

//  const LinkPage = props => (
//  	console.log(props),
//   	<div>
//   		<h2>sdssa</h2>
// 	</div>
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