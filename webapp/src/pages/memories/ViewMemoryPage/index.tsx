import { TrpcRouterOutput } from "@hotelproj/backend/src/router";
import { format } from "date-fns/format";
import { useParams } from "react-router-dom";
import { LinkButton } from "../../../components/Button";
import { Segment } from "../../../components/Segment";
import { withPageWrapper } from "../../../lib/pageWrapper";
import {
  getEditMemoryRoute,
  type ViewMemoryRouteParams,
} from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";
import css from "./index.module.scss";

const LikeButton = ({
  memory,
}: {
  memory: NonNullable<TrpcRouterOutput["getMemory"]["memory"]>;
}) => {
  const trpcUtils = trpc.useContext();
  const setMemoryLike = trpc.setMemoryLike.useMutation({
    onMutate: ({ isLikedByMe }) => {
      const oldGetMemoryData = trpcUtils.getMemory.getData({
        memoryId: memory.nick,
      });
      if (oldGetMemoryData?.memory) {
        const newGetMemoryData = {
          ...oldGetMemoryData,
          memory: {
            ...oldGetMemoryData.memory,
            isLikedByMe,
            likesCount:
              oldGetMemoryData.memory.likesCount + (isLikedByMe ? 1 : -1),
          },
        };
        trpcUtils.getMemory.setData(
          { memoryId: memory.nick },
          newGetMemoryData,
        );
      }
    },
    onSuccess: () => {
      void trpcUtils.getMemory.invalidate({ memoryId: memory.nick });
    },
  });
  return (
    <button
      className={css.likeButton}
      onClick={() => {
        void setMemoryLike.mutateAsync({
          memoryId: memory.id,
          isLikedByMe: !memory.isLikedByMe,
        });
      }}
    >
      {memory.isLikedByMe ? "Unlike" : "Like"}
    </button>
  );
};

export const ViewMemoryPage = withPageWrapper({
  useQuery: () => {
    const { memoryId } = useParams() as ViewMemoryRouteParams;
    return trpc.getMemory.useQuery({
      memoryId,
    });
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    memory: checkExists(queryResult.data.memory, "Memory not found"),
    me: ctx.me,
  }),
  showLoaderOnFetching: false,
})(({ memory, me }) => (
  <Segment title={memory.name} description={memory.description}>
    <div className={css.createdAt}>
      Created At: {format(memory.createdAt, "yyyy-MM-dd")}
    </div>
    <div className={css.author}>
      Author: {memory.author.nick}
      {memory.author.name ? ` (${memory.author.name})` : ``}
    </div>
    <div
      className={css.text}
      dangerouslySetInnerHTML={{ __html: memory.text }}
    ></div>
    <div className={css.likes}>
      Likes: {memory.likesCount}
      {me && (
        <>
          <br />
          <LikeButton memory={memory} />
        </>
      )}
    </div>
    {me?.id === memory.authorId && (
      <div className={css.editButton}>
        <LinkButton to={getEditMemoryRoute({ memoryId: memory.nick })}>
          Edit Memory
        </LinkButton>
      </div>
    )}
  </Segment>
));
