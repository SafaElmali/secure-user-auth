const { gql } = require('apollo-server');
const user = require('../models/user');

/*
https://www.apollographql.com/docs/apollo-server/security/authentication/#authorization-in-resolvers*/
const resolvers = {

    Query: {
        me: (root, args, context) => {
            console.log(args);

            // In this case, we'll pretend there is no data when
            // we're not logged in. Another option would be to
            // throw an error.
            if (!context.currentUser || !context.currentUser.roles.includes('admin')) return null;
        }
    }
}

module.exports = resolvers;