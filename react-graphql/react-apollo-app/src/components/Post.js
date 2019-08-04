import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LinkPage from './LinkPage';
import App from '../App';
import './Post.css';


class Post extends Component{

	getHighlightedText=()=> {
	let higlight = this.props.term
	let text = this.props.post.postTitle
    // Split on higlight term and include term into parts, ignore case
    let parts = text.split(new RegExp(`(${higlight})`, 'gi'));
    return <span> { parts.map((part, i) => 
        <span key={i} style={part.toLowerCase() === higlight.toLowerCase() ? { fontWeight: 'bold' } : {} }>
            { part }
        </span>)
    } </span>;
};

render(){
	const link = "/page/" + this.props.post.link +".html";
	

return(
  <div className="gaadiex-list-item abc">
  	<a href={link}><h6>{this.getHighlightedText()}</h6></a>
	</div>
)
}
}
export default Post