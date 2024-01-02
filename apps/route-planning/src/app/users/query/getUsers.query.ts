import { ApolloClient, InMemoryCache, gql } from '@apollo/client';


export const client = new ApolloClient({
    uri: 'http://localhost:3333/graphiql',
    cache: new InMemoryCache(),
  });

export  const getUsers = gql`
    query getUser{
        allUsers{
            nodes{
                email
                id
                name
                isAdmin
            }
        }
    }
`