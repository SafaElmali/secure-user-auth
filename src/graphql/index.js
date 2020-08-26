import { gql } from '@apollo/client'

export const LOGIN = gql`
    mutation Login($name:String!,$password:String!){
        login(name:$name,password:$password){
        message,
        token,
        userInfo{
            name,
            email,
            password,
            role
        },
        expiresAt
        }
    }
`

export const SIGN_UP = gql`
    mutation Signup($name:String!,$email:String!,$password:String!){
        createUser(name:$name,email:$email,password:$password){
        message,
        token,
        userInfo{
            name,
            email,
            password,
            role
        },
        expiresAt
        }
    }
`

export const GET_DASHBOARD_DATA = gql`
    query GetDashboardData{
        dashboardData
    }
`

