'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.start = undefined;

var _mongodb = require('mongodb');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _graphqlServerExpress = require('graphql-server-express');

var _graphqlTools = require('graphql-tools');

var _cors = require('cors');

var _cors2 = _interopRequireDefault(_cors);

var _index = require('../util/index');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

app.use((0, _cors2.default)());

var homePath = '/graphiql';
var URL = 'http://localhost';
var PORT = 4001;
var MONGO_URL = 'mongodb://user1:abcd1234@ds147233.mlab.com:47233/surkhi';
var limit = 10; // The number of results that we want to display


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


var start = exports.start = function _callee() {
  var db, MyPosts, typeDefs, resolvers, schema;
  return regeneratorRuntime.async(function _callee$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return regeneratorRuntime.awrap(_mongodb.MongoClient.connect(MONGO_URL));

        case 3:
          db = _context7.sent;
          MyPosts = db.collection('myposts');
          // db.collection('myposts').ensureIndex({postTitle:"text"});
          // db.collection('myposts').ensureIndex({postSummary:"text"});


          // MongoDB provides text indexes to support text search queries on 
          // string content. text indexes can include any field whose value is a 
          // string or an array of string elements.
          // To create a text index with different field weights for the content field 
          // and the keywords field, include the weights option to the createIndex() method

          db.collection('myposts').createIndex({
            postTitle: "text",
            postSummary: "text"
          }, {
            weights: {
              postTitle: 1.4,
              postSummary: 1
            },
            name: "TextIndex"
          });

          // Searching the presence of a word in either the post title or the post summary.
          // db.collection('myposts').find( { $text: { $search: "java coffee shop" } } )

          // db.books.find(Description_tags:"Programming");


          typeDefs = ['\ntype Query {\n  myposts: [MyPost]\n  mypost(_id: String): MyPost \n  mytags(postTitle: String): MyPost\n  findtags(tags: String): [MyPost]\n  searchquery(sq: String): [MyPost]\n}\n\ntype MyPost {\n  _id: String\n  postTitle: String!\n  postSummary: String!\n  tags: [String]\n  verdict: Boolean\n}\n\ntype Mutation {\n  createMyPost(postTitle: String!, postSummary: String!, tags: [String], verdict: Boolean): MyPost\n}\n\nschema {\n  query: Query\n  mutation: Mutation\n}\n'];
          resolvers = {
            Query: {

              mypost: function mypost(root, _ref) {
                var _id = _ref._id;
                return regeneratorRuntime.async(function mypost$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.t0 = _index.prepare;
                        _context.next = 3;
                        return regeneratorRuntime.awrap(MyPosts.findOne((0, _mongodb.ObjectId)(_id)));

                      case 3:
                        _context.t1 = _context.sent;
                        return _context.abrupt('return', (0, _context.t0)(_context.t1));

                      case 5:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, null, undefined);
              },
              myposts: function myposts() {
                return regeneratorRuntime.async(function myposts$(_context2) {
                  while (1) {
                    switch (_context2.prev = _context2.next) {
                      case 0:
                        _context2.next = 2;
                        return regeneratorRuntime.awrap(MyPosts.find({}).toArray());

                      case 2:
                        _context2.t0 = _index.prepare;
                        return _context2.abrupt('return', _context2.sent.map(_context2.t0));

                      case 4:
                      case 'end':
                        return _context2.stop();
                    }
                  }
                }, null, undefined);
              },
              mytags: function mytags(root, _ref2) {
                var postTitle = _ref2.postTitle;
                var a, x;
                return regeneratorRuntime.async(function mytags$(_context3) {
                  while (1) {
                    switch (_context3.prev = _context3.next) {
                      case 0:
                        a = postTitle;
                        _context3.next = 3;
                        return regeneratorRuntime.awrap(MyPosts.findOne({ postTitle: a }));

                      case 3:
                        x = _context3.sent;

                        console.log(x);
                        _context3.t0 = _index.prepare;
                        _context3.next = 8;
                        return regeneratorRuntime.awrap(MyPosts.findOne({ postTitle: a }));

                      case 8:
                        _context3.t1 = _context3.sent;
                        return _context3.abrupt('return', (0, _context3.t0)(_context3.t1));

                      case 10:
                      case 'end':
                        return _context3.stop();
                    }
                  }
                }, null, undefined);
              },
              findtags: function findtags(root, _ref3) {
                var tags = _ref3.tags;
                var a, x;
                return regeneratorRuntime.async(function findtags$(_context4) {
                  while (1) {
                    switch (_context4.prev = _context4.next) {
                      case 0:
                        a = tags;

                        console.log(a);
                        _context4.next = 4;
                        return regeneratorRuntime.awrap(MyPosts.find({ "tags": a }).toArray());

                      case 4:
                        x = _context4.sent;
                        return _context4.abrupt('return', x);

                      case 6:
                      case 'end':
                        return _context4.stop();
                    }
                  }
                }, null, undefined);
              },

              searchquery: function searchquery(root, _ref4) {
                var sq = _ref4.sq;
                var a, re, partial;
                return regeneratorRuntime.async(function searchquery$(_context5) {
                  while (1) {
                    switch (_context5.prev = _context5.next) {
                      case 0:
                        a = sq;
                        re = new RegExp(a, "i");

                        // var full = await MyPosts.find({ $text: { $search: a } }, 
                        //   { score: { $meta: "textScore" }}).sort( { score: { $meta: "textScore" } } ).limit(limit).toArray()

                        // if (full.length < limit){
                        //   // var partial = await MyPosts.find({'postTitle': re}).toArray();

                        _context5.next = 4;
                        return regeneratorRuntime.awrap(MyPosts.find({ "$or": [{ "postTitle": re }, { "postSummary": re }] }).toArray());

                      case 4:
                        partial = _context5.sent;
                        return _context5.abrupt('return', partial);

                      case 6:
                      case 'end':
                        return _context5.stop();
                    }
                  }
                }, null, undefined);
              }

              // else{
              //   return full
              // }
              // },
            },
            Mutation: {
              createMyPost: function createMyPost(root, args) {
                var res;
                return regeneratorRuntime.async(function createMyPost$(_context6) {
                  while (1) {
                    switch (_context6.prev = _context6.next) {
                      case 0:
                        _context6.next = 2;
                        return regeneratorRuntime.awrap(MyPosts.insert(args));

                      case 2:
                        res = _context6.sent;

                        console.log(res);
                        _context6.t0 = _index.prepare;
                        _context6.next = 7;
                        return regeneratorRuntime.awrap(MyPosts.findOne({ _id: res.insertedIds[0] }));

                      case 7:
                        _context6.t1 = _context6.sent;
                        return _context6.abrupt('return', (0, _context6.t0)(_context6.t1));

                      case 9:
                      case 'end':
                        return _context6.stop();
                    }
                  }
                }, null, undefined);
              }
            }
          };
          schema = (0, _graphqlTools.makeExecutableSchema)({
            typeDefs: typeDefs,
            resolvers: resolvers
          });


          app.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({ schema: schema }));

          app.use(homePath, (0, _graphqlServerExpress.graphiqlExpress)({
            endpointURL: '/graphql'
          }));

          app.listen(PORT, function () {
            console.log('Visit ' + URL + ':' + PORT + homePath);
          });

          _context7.next = 17;
          break;

        case 14:
          _context7.prev = 14;
          _context7.t0 = _context7['catch'](0);

          console.log(_context7.t0);

        case 17:
        case 'end':
          return _context7.stop();
      }
    }
  }, null, undefined, [[0, 14]]);
};