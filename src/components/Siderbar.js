import React from 'react';
import 'styled-components/macro';
import { useQuery, gql } from '@apollo/client';


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
        {loading && <div>loading...</div>}
        {error && <div>Error...</div>}
        {data && data.viewer && (
          <img src={data.viewer.avatarUrl} alt={data.viewer.login} />
        )}

      </div>
      <div>

        <button
          onClick={
            () => {
              localStorage.clear()
              window.location.reload()
            }
          }>
          Logout
          </button>
      </div>
    </aside>
  )
}


export default Sidebar