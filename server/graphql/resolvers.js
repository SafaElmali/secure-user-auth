const { UserInputError, AuthenticationError } = require('apollo-server');
const User = require('../models/user');

/*
https://www.apollographql.com/docs/apollo-server/security/authentication/#authorization-in-resolvers*/
const resolvers = {
    Query: {
        me: (root, args, context) => {
            console.log(args);
            // In this case, we'll pretend there is no data when
            // we're not logged in. Another option would be to
            // throw an error.
            // if (!context.currentUser || !context.currentUser.roles.includes('admin')) return null;
        },
        createUser: async (root, args, context) => {
            const user = new User({ ...args });
            try {
                await user.save();
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args
                })
            }
            return user;
        }
    },
    Mutation: {
        login: async (root, args, context) => {
            await User.findOne({ name: args.name }, function (err, user) {
                if (err) throw err;

                if (!user) throw new AuthenticationError('this user is not found!');

                //compare passwords
                user.authenticate(args.password, async function (err, isMatch) {
                    if (err) throw err;

                    if (!isMatch) throw new AuthenticationError('wrong password!');

                    const jwt = await user.generateJWT();
                    return { value: jwt };
                })
            })
        },
    }
}

module.exports = resolvers;