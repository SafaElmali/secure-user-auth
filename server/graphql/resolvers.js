const { UserInputError, AuthenticationError } = require("apollo-server");
const User = require("../models/user");
const jwtDecode = require("jwt-decode");
const dashboardData = require("../data/dashboardData");

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
    getDashboardData: (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError(
          'You don"t have permission to access this data!'
        );
      return dashboardData;
    },
    getUsers: async (root, args, context) => {
      if (!context.currentUser)
        throw new AuthenticationError(
          'You don"t have permission to access this data!'
        );
      try {
        const userList = await User.find().lean().select("_id role name");
        console.log(userList);
      } catch (err) {
        console.log(err);
      }
    },
  },
  Mutation: {
    createUser: async (root, args, context) => {
      const user = new User({ ...args, role: "ADMIN" });
      try {
        // Save user
        const savedUser = await user.save();

        //If user saved get token for it and response with
        if (savedUser) {
          const token = savedUser.generateJWT();
          const decodeToken = jwtDecode(token);

          const expiresAt = new Date(decodeToken.exp * 1000);

          const userInfo = {
            name: savedUser.name,
            email: savedUser.email.toLowerCase(),
            password: savedUser.password,
            role: savedUser.role,
          };

          context.res.cookie("token", token, {
            httpOnly: true,
            expiresAt: expiresAt,
          });

          return {
            message: "User Created!",
            token,
            userInfo,
            expiresAt: decodeToken.exp,
          };
        } else {
          return {
            message: "There was a problem creating your account",
          };
        }
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
    },
    login: async (root, args, context) => {
      // *** lean(): https://mongoosejs.com/docs/tutorials/lean.html
      // This makes queries faster and less memory intensive, but the result documents are plain old JavaScript objects (POJOs), not Mongoose documents
      const user = await User.findOne({ name: args.name });

      if (!user) throw new AuthenticationError("User Not Found!");

      return user
        .authenticate(args.password)
        .then((isMatch) => {
          if (!isMatch)
            throw new AuthenticationError("Wrong Password Or Username!");

          // If we used lean we can do this
          // const { password, bio, ...rest } = user;
          // const userInfo = Object.assign({}, { ...rest });

          const userInfo = {
            name: user.name,
            email: user.email.toLowerCase(),
            password: user.password,
            role: user.role,
          };

          const token = user.generateJWT();
          const decodeToken = jwtDecode(token);

          const expiresAt = new Date(decodeToken.exp * 1000);

          context.res.cookie("token", token, {
            httpOnly: true,
            expires: expiresAt,
          });

          return {
            message: "Authentication successful!",
            token,
            userInfo,
            expiresAt: decodeToken.exp,
          };
        })
        .catch((err) => {
          console.log(err);
          return {
            message: "Something went wrong!",
          };
        });
    },
    modifyUserRoles: async (root, args, context) => {
      console.log(args);
    },
  },
};

module.exports = resolvers;
