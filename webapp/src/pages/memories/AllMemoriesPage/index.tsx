import { Link } from "react-router-dom";
import { Alert } from "../../../components/Alert";
import { Segment } from "../../../components/Segment";
import { getViewMemoryRoute } from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import css from "./index.module.scss";

export const AllMemoriesPage = () => {
  const {
    data,
    error,
    isLoading,
    isError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isRefetching,
  } = trpc.getMemories.useInfiniteQuery(
    {
      limit: 2,
    },
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
    },
  );

  if (!data) {
    return <span>No data available</span>;
  }

  return (
    <Segment title="All memories">
      {isLoading || isRefetching ? (
        <div>Loading...</div>
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.memories}>
          {data.pages
            .flatMap((page) => page.memories)
            .map((memory) => (
              <div key={memory.name} className={css.memory}>
                <Segment
                  title={
                    <Link
                      className={css.memoryLink}
                      to={getViewMemoryRoute({ memoryId: memory.nick })}
                    >
                      {memory.name}
                    </Link>
                  }
                  size={2}
                  description={memory.description}
                />
              </div>
            ))}
          <div className={css.more}>
            {hasNextPage && !isFetchingNextPage && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  void fetchNextPage();
                }}
              >
                Load more
              </button>
            )}
            {isFetchingNextPage && <span>Loading...</span>}
          </div>
        </div>
      )}
    </Segment>
  );
};
