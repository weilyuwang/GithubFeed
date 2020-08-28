import React from 'react';
import { createGlobalStyle } from 'styled-components'

import Login from './Login'

import 'styled-components/macro'

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
      <Login />
    </>
  );
}

export default App;
