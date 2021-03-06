import { useQuery  } from "@apollo/client";
import StudyPlayground from './StudyPlayground';
import gql from "graphql-tag";

//get study playground's data after login successful.
export default function AccessData() {
  
  var kidId = Number(window.localStorage.getItem("kidId"))
  
  const Studies_QUERY = gql`
  {
    studies(first:50,id:${kidId}){
      nodes{
        id
        content
        language
        kidId
        imageURI
        created
      }
    }
     }`;

  const { data, loading, error } = useQuery(Studies_QUERY,{
    //The query automatically updates if the result of the server-side query modifies cached fields.
    fetchPolicy: "cache-and-network"
  }
  )

  if (loading) return <p>Still loading..</p>
  if (error) return <p>There is an error!{error}</p>

  //change created field's format
  for (let i = 0; i < data.studies.nodes.length; i++) {
    const a = data.studies.nodes[i].created.toString()
    data.studies.nodes[i].created = a.substring(0, 10)
  }

  return (
    <div>
      <StudyPlayground data={data.studies.nodes} /> 
    </div>
  )
}










