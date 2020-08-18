const { gql } = require('apollo-server');

const typeDefs = gql`
    type User{
        id:ID!,
        name:String!,
        password:String!
        email:String!,
        roles:[Role!]!
    }

    enum Role {
        ADMIN,
        MAINTAINER,
        CUSTOMER
    }

    type Query{
        me:User
    }
`

module.exports = typeDefs;