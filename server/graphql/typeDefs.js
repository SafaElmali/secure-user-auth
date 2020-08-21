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
        roles:[Role!]!
    }

    type Token{
        value:String
    }

    type Query {
        me:User
    }

    type Mutation{
        login(name:String!,password:String!):Token
        createUser(name:String!,email:String!,password:String!):User
        modifyUserRoles(name:String,roles:[Role!]):User
    }
`

module.exports = typeDefs;