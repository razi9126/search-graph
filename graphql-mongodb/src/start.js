import {MongoClient, ObjectId} from 'mongodb'
import express from 'express'
import bodyParser from 'body-parser'
import {graphqlExpress, graphiqlExpress} from 'graphql-server-express'
import {makeExecutableSchema} from 'graphql-tools'
import cors from 'cors'
import {prepare} from "../util/index"


const app = express()

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'react-graphql/react-apollo-ap/build')))


const homePath = '/graphiql'
const URL = 'http://localhost'
const PORT = process.env.PORT || 4001;
const MONGO_URL = 'mongodb://user1:abcd1234@ds147233.mlab.com:47233/surkhi'
const limit = 10; // The number of results that we want to display


// New article mutations
// mutation{
//   createMyPost(postTitle:"Canvassing for tit-for-tat Senate motions in full swing",
//     postSummary:"Senate secretariat asks president to select presiding officer for next week session; Shibli says no deal sought.",
//     tags:["Pakistan","senate","president"], verdict: true)
//   {
//     postTitle
//     postSummary
//   }
// }



export const start = async () => {
  try {
    const db = await MongoClient.connect(MONGO_URL)
    const MyPosts = db.collection('myposts')
    // db.collection('myposts').ensureIndex({postTitle:"text"});
    // db.collection('myposts').ensureIndex({postSummary:"text"});


    // MongoDB provides text indexes to support text search queries on 
    // string content. text indexes can include any field whose value is a 
    // string or an array of string elements.
    // To create a text index with different field weights for the content field 
    // and the keywords field, include the weights option to the createIndex() method
    db.collection('myposts').createIndex( 
      { 
        postTitle: "text", 
        postSummary: "text" 
      },
      {
       weights: {
         postTitle: 1.4,
         postSummary: 1
       },
       name: "TextIndex"
     }
    )

    // Searching the presence of a word in either the post title or the post summary.
    // db.collection('myposts').find( { $text: { $search: "java coffee shop" } } )

// db.books.find(Description_tags:"Programming");


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

const resolvers = {
  Query: {

    mypost: async (root, {_id}) => {
      return prepare(await MyPosts.findOne(ObjectId(_id)))
    },
    myposts: async () => {
      return (await MyPosts.find({}).toArray()).map(prepare)
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
      //   { score: { $meta: "textScore" }}).sort( { score: { $meta: "textScore" } } ).limit(limit).toArray()

      // if (full.length < limit){
      //   // var partial = await MyPosts.find({'postTitle': re}).toArray();

        var partial = await MyPosts.find({"$or": [
             { "postTitle":  re },
             { "postSummary": re },
           ]}).toArray();
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
}

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})


app.use('/graphql', bodyParser.json(), graphqlExpress({schema}))

app.use(bodyParser.urlencoded({ extended: true}));

app.use(homePath, graphiqlExpress({
  endpointURL: '/graphql'
}))

app.use(express.static(path.join(__dirname, 'react-graphql/react-apollo-ap/build')));

app.get('/', function (req, res) {
  res.send('Im running!');
});
app.get('/dy', function (req, res) {
  res.send('Im running!');
});
// Handle React routing, return all requests to React app
app.get('*', function(req, res) {
  res.sendFile('index.html', {root: path.join(__dirname, '/react-graphql/react-apollo-ap/build')});
});

app.listen(PORT, () => {
  console.log(`Visit ${URL}:${PORT}${homePath}`)
})

} catch (e) {
  console.log(e)
}

}
