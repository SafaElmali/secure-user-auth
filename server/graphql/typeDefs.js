const { gql } = require('apollo-server');

const typeDefs = gql`
    """https://github.com/taion/graphql-type-json"""
	scalar JSON

    enum Role {
        ADMIN,
        USER,
    }

    type User{
        id:ID!,
        name:String!,
        password:String!
        email:String!,
        role:Role!
    }

    type AuthInfo{
        message:String,
        token:String,
        userInfo:User,
        expiresAt:Int!
    }

    type Query {
        me:User
        dashboardData:JSON
    }

    type Mutation{
        login(name:String!,password:String!):AuthInfo
        createUser(name:String!,email:String!,password:String!):AuthInfo
        modifyUserRoles(name:String,roles:[Role!]):AuthInfo
    }
`

module.exports = typeDefs;