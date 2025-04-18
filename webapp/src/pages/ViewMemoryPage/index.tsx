import { format } from "date-fns/format";
import { useParams } from "react-router-dom";
import { LinkButton } from "../../components/Button";
import { Segment } from "../../components/Segment";
import { withPageWrapper } from "../../lib/pageWrapper";
import {
  getEditMemoryRoute,
  type ViewMemoryRouteParams,
} from "../../lib/routes";
import { trpc } from "../../lib/trpc";
import css from "./index.module.scss";

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
})(({ memory, me }) => (
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
));
