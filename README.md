# GraphQL Search

### Server files
- config.js
- models.js
- server.js

### Frontend files
- Folder `react-graphql`

### gql playground
https://graphql-search-surkhi.herokuapp.com/graphql

Folder `graphql-mongodb` is previous code. Had some issues with it. It's there only for reference if needed.

### New article mutations
```
mutation{
   createMyPost(postTitle:"Canvassing for tit-for-tat Senate motions in full swing",
     postSummary:"Senate secretariat asks president to select presiding officer for next week session; Shibli says no deal sought.",
     tags:["Pakistan","senate","president"], verdict: true)
   {
     postTitle
     postSummary
   }
 }
```

