import { format } from "date-fns/format";
import { useParams } from "react-router-dom";
import { LinkButton } from "../../components/Button";
import { Segment } from "../../components/Segment";
import { getEditMemoryRoute, viewMemoryRouteTypes } from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import css from "./index.module.scss";

export const ViewMemoryPage = () => {
  const { memoryId } = useParams() as viewMemoryRouteTypes;

  const getMemoryResult = trpc.getMemory.useQuery({
    memoryId,
  });

  const getMeResult = trpc.getMe.useQuery();

  if (getMemoryResult.isLoading || getMemoryResult.isFetching) {
    return <span>Loading...</span>;
  }

  if (getMemoryResult.isError) {
    return <span>Error: {getMemoryResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getMemoryResult.data?.memory) {
    return <span>No data available</span>;
  }

  const memory = getMemoryResult.data.memory;
  const me = getMeResult.data?.me;

  return (
    <Segment title={memory.name} description={memory.description}>
      <div className={css.createdAt}>
        Created At: {format(memory.createdAt, "yyyy-MM-dd")}
      </div>
      <div className={css.author}>Author: {memory.author.nick}</div>
      <div
        className={css.text}
        dangerouslySetInnerHTML={{ __html: memory.text }}
      ></div>
      {me?.id === memory.authorId && (
        <div className={css.editButton}>
          <LinkButton to={getEditMemoryRoute({ memoryId: memory.nick })}>
            Edit Memory
          </LinkButton>
        </div>
      )}
    </Segment>
  );
};
