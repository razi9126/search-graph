import './SearchBox.css';
import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Post from './Post';
import SearchPosts from './SearchPosts';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-client-preset';
import { debounce, throttle } from "throttle-debounce";


const httpLink = new HttpLink({ uri: 'http://localhost:4001/graphql' })
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
})

const SEARCH_QUERY = gql`
query PostSearch($sq: String) {
  searchquery(sq: $sq) {
    postTitle
    postSummary
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
        <button>Search</button>
        <div className="row">
        {this.state.results.map((singlePost, index) => (
          <Post post={singlePost} index={index} />
          ))}
        </div>
        </div>

        );
    }
  }

  export default SearchBox;

