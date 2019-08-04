import './SearchBox.css';
import React, { Component } from 'react';
import gql from 'graphql-tag';
import Post from './Post';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { debounce, throttle } from "throttle-debounce";
import { Link, BrowserRouter as Router, Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import LinkPage from './LinkPage';
import App from '../App.js'

// const httpLink = new HttpLink({ uri: 'http://localhost:4001/graphql' })
const httpLink = new HttpLink({ uri: 'https://graphql-search-surkhi.herokuapp.com/graphql' })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const SEARCH_QUERY = gql`
query PostSearch($sq: String) {
  searchquery(sq: $sq) {
    postTitle
    postSummary
    tags
    link
  }
}
`

class SearchBox extends Component{
  constructor(props) {
    super(props);
    this.state= {
      searchTerm : '',
      results: [],
    };
    this.SearchDebounced = debounce(300, this._fetch);
    this.SearchThrottled = throttle(300, this._fetch);
  }

  changeQuery = query => {
    this.setState({ searchTerm: query }, () => {
      //comment for future
      // this._fetch()

      //uncomment for future
      const q = this.state.searchTerm;
      if (q.length < 5) {
        this.SearchThrottled();
      } else {
        this.SearchDebounced();
      }
    });
  };

  _fetch = () => {
    const results = this.state.results || [];
    this.setState({ results });
    this._executeSearch();
  };


  _executeSearch = async () => {
    const { searchTerm } = this.state
      // The variable in "variables" should be the same name as in gql server
      const result = await client.query({
        query: SEARCH_QUERY,
        variables: { sq: searchTerm},
      })

      this.setState({ results: result.data.searchquery })
    }



    render(){
      return(
        <div>
          <input name="text" type="text" placeholder="Search" 
          value={this.state.searchTerm} 
          onChange={e => this.changeQuery( e.target.value)}
          />
          <div className="gaadiex-list">
          {this.state.results.map((singlePost, index) => (

            <Post post={singlePost} term={this.state.searchTerm} key={index} />
            ))}
          </div>
        </div>
        );
    }
  }

// {this.state.results.map((singlePost, index) => (
//             <Post post={singlePost} key={index} />
//             ))
//           }
  export default SearchBox;

