import { useParams } from "react-router-dom";
import { viewMemoryRouteTypes } from "../../lib/routes";
import {trpc} from "../../lib/trpc"

 export const  ViewMemoryPage = () => {
  const {memoryId} = useParams() as viewMemoryRouteTypes

  const { data, error, isLoading, isFetching, isError } = trpc.getMemory.useQuery({
    memoryId 
  });

  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data.memory) {
    return <span>No data available</span>;
  }

   return(
    <div className="1">
        <h1>{data.memory.name}</h1>
        <p>{data.memory.description}</p>
        <div dangerouslySetInnerHTML={{__html: data.memory.text}}></div>
    </div>
   );
 };