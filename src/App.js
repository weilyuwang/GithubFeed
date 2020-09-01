import React from 'react';
import { ApolloClient, InMemoryCache, createHttpLink, ApolloProvider } from '@apollo/client';
import { createGlobalStyle } from 'styled-components'
import 'styled-components/macro'
import Login from './Login'

// Components
import Sidebar from './components/Siderbar'
import Column from './components/Column'

// get the authentication token from local storage if it exists
const accessToken = localStorage.getItem('token');

const httpLink = createHttpLink({
  uri: 'https://api.github.com/graphql',
  headers: {
    Authorization: `Bearer ${accessToken}`
  }
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
});

// Using fetch():
// fetch('https://api.github.com/graphql', {
//   method: 'POST',
//   headers: {
//     Authorization: `bearer ${accessToken}`
//   },
//   body: JSON.stringify({
//     query: `
//     {
//       viewer {
//         name
//       }
//     }
//     `
//   })
// })
//   .then(res => res.json())
//   .then(json => console.log(json))

const Global = createGlobalStyle({
  body: {
    backgroundColor: '#fff',
    color: '#444',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto"',
    padding: 0,
    margin: 0,
    borderTop: '4px solid rgb(210, 54, 105)',
  },
  '*': {
    boxSizing: 'border-box',
  },
});

function App() {
  return (
    <>
      <Global />
      {accessToken ?
        <ApolloProvider client={client}>
          {/* 
            Under the hood, the Babel plugin turns any element 
            with a css prop into a styled component.  
          */}
          <div css={{
            display: 'grid',
            gridTemplateColumns: '80px repeat(auto-fit, 300px)',
            alignItems: 'start',
            height: 'calc(100vh - 4px)',
            overflow: 'hidden',
          }}>
            <Sidebar />
            <Column user="weilyuwang" />
            <Column user="divyanshu013" />
            <Column user="metagrover" />
          </div>
        </ApolloProvider>
        :
        <Login />
      }

    </>
  );
}

export default App;
