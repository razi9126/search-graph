import React from 'react'
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LinkPage from './LinkPage';
import App from '../App';
import './Post.css';

// 			<Route exact path="/page/:pageLink" component={()=> <LinkPage postObject={props.post} /> } />


const Post = props => (
  	<div className="gaadiex-list-item abc">
  	<Router>
  		<Switch>
  		<React.Fragment>

	  	<Link to={`/page/${props.post.link}`}><h6>{props.post.postTitle}</h6></Link>
			<Route exact path="/page/:pageLink" component={()=> <LinkPage postObject={props.post} /> } />
		</React.Fragment>
		</Switch>

  	</Router>
	</div>
)

export default Post