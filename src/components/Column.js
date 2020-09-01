import React from 'react';
import styled from 'styled-components';
import { useQuery, gql } from '@apollo/client';

import 'styled-components/macro';

import RepoCard from './RepoCard'
import Avatar from './Avatar'

const GET_USER_ACTIVITY = gql`
	query($user: String!) {
		user(login: $user) {
			id
			avatarUrl
			starredRepositories(last: 6) {
				pageInfo {
					hasPreviousPage
					startCursor
				}
				edges {
          cursor
					node {
						id
						createdAt
						viewerHasStarred
						nameWithOwner
						owner {
							avatarUrl
						}
						url
						repositoryTopics(first: 4) {
							edges {
								node {
									id
									topic {
										id
										name
									}
								}
							}
						}
					}
				}
			}
		}
	}
`;

const ColumnWrapper = styled('section')({
  width: '100%',
  maxWidth: 300,
  backgroundColor: '#fafafa',
  borderRight: '2px solid #eee',
  padding: 15,
  height: 'calc(100vh - 4px)',
  overflowY: 'scroll',
});

const Column = ({ user }) => {
  const { loading, data, error } = useQuery(GET_USER_ACTIVITY, {
    variables: { user: user },
  });

  if (data) {
    console.log(data)
  }

  return (
    <ColumnWrapper>
      <>
        {loading && <div>Loading...</div>}
        {error && <div>{JSON.stringify(error)}</div>}
        {data && data.user && (
          <>
            <div css={{
              alignItems: 'center',
              display: 'flex',
              padding: '0 0 16px',
            }}>
              <Avatar src={data.user.avatarUrl} width={25} height={25} />
              <div css={{ marginLeft: 12 }}>{user}</div>
            </div>

            {data.user.starredRepositories.edges.map(({ node }) => {
              return <RepoCard data={node} key={node.id} />
            })}
          </>
        )}
      </>
    </ColumnWrapper>
  )
}

export default Column;