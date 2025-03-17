import { Link } from "react-router-dom";
import { trpc } from "../../lib/trpc";
import { getViewMemoryRoute } from "../../lib/routes";


export const AllMemoriesPage = () => {
  const { data, error, isLoading, isFetching, isError } = trpc.getMemories.useQuery();
  
  if (isLoading || isFetching) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  if (!data) {
    return <span>No data available</span>;
  }

  return (
    <div className="1">
      <div className="any_classname">123</div>
      {data.memories.map((memory) => (
        <div key={memory.id} className="2">
          <h2><Link to={getViewMemoryRoute({memoryId: memory.id})}>{memory.name}</Link></h2>
          <p>{memory.description}</p>
        </div>
      ))}
    </div>
  );
};
