const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const {MongoClient, ObjectId} = require('mongodb');
const bodyParser = require('body-parser');
require('./config');

const PORT = process.env.PORT || 4001;
const MONGO_URL = 'mongodb://user1:abcd1234@ds147233.mlab.com:47233/surkhi'
const { MyPosts } = require('./models');


// Construct a schema, using GraphQL schema language
const typeDefs = [`
type Query {
  myposts: [MyPost]
  mypost(_id: String): MyPost 
  mytags(postTitle: String): MyPost
  findtags(tags: String): [MyPost]
  searchquery(sq: String): [MyPost]
}

type MyPost {
  _id: String
  postTitle: String!
  postSummary: String!
  tags: [String]
  verdict: Boolean
}

type Mutation {
  createMyPost(postTitle: String!, postSummary: String!, tags: [String], verdict: Boolean): MyPost
}

schema {
  query: Query
  mutation: Mutation
}
`];
 
// Provide resolver functions for your schema fields
const resolvers = {
  Query: {

    mypost: async (root, {_id}) => {
      return prepare(await MyPosts.findOne(ObjectId(_id)))
    },
    myposts: async () => {
      // return (await MyPosts.find({}).toArray()).map(prepare)
      return (await MyPosts.find({}))
    },
    mytags: async (root, {postTitle}) => {
      var a = postTitle;
      var x = await MyPosts.findOne({postTitle:a})
      console.log(x)
      return prepare(await MyPosts.findOne({postTitle:a}))
    },
    findtags: async (root, {tags}) => {
      var a = tags;
      console.log(a);
      var x = await MyPosts.find({"tags":a}).toArray()
      return x
    },


    searchquery: async (root,{sq}) => {
      var a = sq;
      var re = new RegExp(a, "i");

      // var full = await MyPosts.find({ $text: { $search: a } }, 
      //   { score: { $meta: "textScore" }}).sort( { score: { $meta: "textScore" } } ).limit(limit)

      // if (full.length < limit){
      //   // var partial = await MyPosts.find({'postTitle': re});

        var partial = await MyPosts.find({"$or": [
             { "postTitle":  re },
             { "postSummary": re },
           ]});
        // full.concat(partial);
        // return full

        return partial
      }

      // else{
      //   return full
      // }
    // },
  },
  Mutation: {
    createMyPost: async (root, args) => {
      const res = await MyPosts.insert(args)
      return prepare(await MyPosts.findOne({_id: res.insertedIds[0]}))
    },
  },
};
 
const server = new ApolloServer({ typeDefs, resolvers });


const app = express();
server.applyMiddleware({ app });
 
app.listen(PORT, () =>
  console.log(`🚀 Server ready at http://localhost:4001${server.graphqlPath}`)
);