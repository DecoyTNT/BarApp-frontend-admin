import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import fetch from 'node-fetch';
// import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
    uri: 'https://bar-app-backend-jm.herokuapp.com/',
    // uri: 'http://localhost:4000/',
    // uri: 'http://34.237.210.239:4000/',
    fetch
});

// const authLink = setContext((_, { headers }) => {

//     // obtener token del localStorage
//     const token = localStorage.getItem('token');

//     return {
//         headers: {
//             ...headers,
//             authorization: token
//         }
//     }
// });

const client = new ApolloClient({
    connectToDevTools: true,
    cache: new InMemoryCache(),
    // link: authLink.concat(httpLink),
    link: httpLink
});

export default client;