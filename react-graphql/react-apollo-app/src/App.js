import './App.css';
import React from 'react';
import SearchBox from './components/SearchBox'
// import SearchPosts from './components/SearchPosts'

// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphiql',
// });


function App() {
  return (
    <div>
      <nav className="navbar">
        <a className="navbar-brand" href="www.gihub.com">
          GraphQL in React - Demo app
        </a>
      </nav>
      <div className="container">
        <SearchBox />
      </div>
    </div>
  );
}

export default App;
