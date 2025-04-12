import format from "date-fns/format";
import { useParams } from "react-router-dom";
import { Segment } from "../../components/Segment";
import { viewMemoryRouteTypes } from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import css from "./index.module.scss";

export const ViewMemoryPage = () => {
  const { memoryId } = useParams() as viewMemoryRouteTypes;

  const { data, error, isLoading, isFetching, isError } =
    trpc.getMemory.useQuery({
      memoryId,
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

  return (
    <Segment title={data.memory.name} description={data.memory.description}>
      <div className={css.createdAt}>
        Created At: {format(data.memory.createdAt, "yyyy-MM-dd")}
      </div>
      <div
        className={css.text}
        dangerouslySetInnerHTML={{ __html: data.memory.text }}
      ></div>
    </Segment>
  );
};
