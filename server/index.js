require('dotenv').config();
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

// The context object is one that gets passed to every single resolver at every level, so we can access it anywhere in our schema code. 
// It’s where we can store things like data fetchers,
// database connections, and (conveniently) information about the user making the request.
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // Note! This example uses the `req` object to access headers,
        // but the arguments received by `context` vary by integration.
        // This means they will vary for Express, Koa, Lambda, etc.!
        //
        // To find out the correct arguments for a specific integration,
        // see the `context` option in the API reference for `apollo-server`:
        // https://www.apollographql.com/docs/apollo-server/api/apollo-server/

        // Get the user token from the headers.
        context: async ({ req }) => {
            const auth = req ? req.headers.authorization : null
            if (auth && auth.toLowerCase().startsWith('bearer ')) {
                const decodedToken = jwt.verify(
                    auth.substring(7), process.env.JWT_SECRET)

                // we could also check user roles/permissions here
                // optionally block the user
                if (!decodedToken) throw new AuthenticationError('you must be logged in');

                const currentUser = await User.findById(decodedToken.id)

                return { currentUser }
            }
        }
    }
});

server.listen().then(({ url }) => {
    console.log(`server running at ${url}`)
})