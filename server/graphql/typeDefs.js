const { gql } = require('apollo-server');

const typeDefs = gql`
    enum Role {
        ADMIN,
        MAINTAINER,
        CUSTOMER
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
    }

    type Mutation{
        login(name:String!,password:String!):AuthInfo
        createUser(name:String!,email:String!,password:String!):AuthInfo
        modifyUserRoles(name:String,roles:[Role!]):AuthInfo
    }
`

module.exports = typeDefs;