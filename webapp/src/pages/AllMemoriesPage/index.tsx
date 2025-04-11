import { Link } from "react-router-dom";
import { trpc } from "../../lib/trpc";
import { getViewMemoryRoute } from "../../lib/routes";
import css from "./index.module.scss";
import { Segment } from "../../components/Segment";


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
    <Segment title="All memories">
      <div className={css.memories}>
      {data.memories.map((memory) => (
        <div key={memory.name} className={css.memory}>
          <Segment 
          title={<Link className={css.memoryLink} to={getViewMemoryRoute({memoryId: memory.nick})}>{memory.name}</Link>}
          size={2}
          description={memory.description}
          >
          </Segment>
        </div>
      ))}
      </div>
    </Segment>
  );
};
