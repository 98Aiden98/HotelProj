import InfiniteScroll from "react-infinite-scroller";
import { Link } from "react-router-dom";
import { Alert } from "../../../components/Alert";
import { layoutContextElRef } from "../../../components/Layout";
import { Loader } from "../../../components/Loader";
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
        <Loader type="section" />
      ) : isError ? (
        <Alert color="red">{error.message}</Alert>
      ) : (
        <div className={css.memories}>
          <InfiniteScroll
            threshold={250}
            loadMore={() => {
              if (!isFetchingNextPage && hasNextPage) {
                void fetchNextPage();
              }
            }}
            hasMore={hasNextPage}
            loader={<Loader type="section" />}
            getScrollParent={() => layoutContextElRef.current}
            useWindow={
              (layoutContextElRef.current &&
                getComputedStyle(layoutContextElRef.current).overflow) !==
              "auto"
            }
          >
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
          </InfiniteScroll>
        </div>
      )}
    </Segment>
  );
};
