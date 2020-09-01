import React from 'react';
import 'styled-components/macro';
import { useQuery, gql } from '@apollo/client';


import Avatar from './Avatar'

const GET_VIEWER = gql`
	query {
		viewer {
			avatarUrl
			login
			id
		}
	}
`;


const Sidebar = () => {
  const { loading, error, data } = useQuery(GET_VIEWER);

  return (
    <aside>
      <div>
        <>
          {loading && <div>loading...</div>}
          {error && <div>Error...</div>}
          {data && data.viewer && (
            <Avatar src={data.viewer.avatarUrl} alt={data.viewer.login} />
          )}
        </>

        <div
          css={{ color: 'rgb(210, 54, 105)', cursor: 'pointer' }}
          onClick={
            () => {
              localStorage.clear()
              window.location.reload()
            }
          }>
          Logout
        </div>
      </div>
    </aside>
  )
}


export default Sidebar