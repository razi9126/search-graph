import React, { Component } from 'react';
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LinkPage from './LinkPage';
import App from '../App';
import './Post.css';


class Post extends Component{


render(){
	const link = "/page/" + this.props.post.link +".html";
return(
  <div className="gaadiex-list-item abc">
  	<a href={link}><h6>{this.props.post.postTitle}</h6></a>
	</div>
)
}
}
export default Post