import React from "react";
import { useQuery, gql } from '@apollo/client'

const GET_ALL_REQUESTS = gql`
  query {
  getAllRequests {
    id
    status
    userType
    user{
      id
      name
      email
      status
    }
  }
}

`
const GraphqlTesting = () => {
  const result = useQuery(GET_ALL_REQUESTS)
  
  const { data, loading, error } = result
 
  if (error) return <div>{error.message}</div>
 
  if (loading) return <div>Loading...</div>
 
  console.log(data.getAllRequests.map((request) => request.id))
  
  return (
    <div>
      Hello world
    </div>
  )
}

export default GraphqlTesting
