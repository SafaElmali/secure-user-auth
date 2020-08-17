const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers');

console.log("connecting to", process.env.MONGODB_URI)

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        console.log("Connected to Mongo DB")
    })
    .catch("Error occured when connecting to DB");

const server = new ApolloServer({
    typeDefs,
    resolvers
})