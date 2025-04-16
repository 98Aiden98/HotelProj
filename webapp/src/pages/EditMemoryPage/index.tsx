import type { TrpcRouterOutput } from "@hotelproj/backend/src/router";
import { zUpdateMemoryTrpcInput } from "@hotelproj/backend/src/router/updateMemory/input";
import pick from "lodash/pick";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { TextArea } from "../../components/TextArea";
import { useForm } from "../../lib/form";
import {
  type EditMemoryRouteParams,
  getViewMemoryRoute,
} from "../../lib/routes";
import { trpc } from "../../lib/trpc";

const EditMemoryComponent = ({
  memory,
}: {
  memory: NonNullable<TrpcRouterOutput["getMemory"]["memory"]>;
}) => {
  const navigate = useNavigate();
  const updateMemory = trpc.updateMemory.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(memory, ["name", "nick", "description", "text"]),
    validationSchema: zUpdateMemoryTrpcInput.omit({ memoryId: true }),
    onSubmit: async (values) => {
      await updateMemory.mutateAsync({ memoryId: memory.id, ...values });
      navigate(getViewMemoryRoute({ memoryId: values.nick }));
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  });

  return (
    <Segment title={`Edit Memory: ${memory.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Name" name="name" formik={formik} />
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Description"
            name="description"
            maxWidth={500}
            formik={formik}
          />
          <TextArea label="Text" name="text" formik={formik} />

          <Alert {...alertProps} />
          <Button {...buttonProps}>Update Memory</Button>
        </FormItems>
      </form>
    </Segment>
  );
};

export const EditMemoryPage = () => {
  const { memoryId } = useParams() as EditMemoryRouteParams;

  const getMemoryResult = trpc.getMemory.useQuery({
    memoryId,
  });
  const getMeResult = trpc.getMe.useQuery();

  if (
    getMemoryResult.isLoading ||
    getMemoryResult.isFetching ||
    getMeResult.isLoading ||
    getMeResult.isFetching
  ) {
    return <span>Loading...</span>;
  }

  if (getMemoryResult.isError) {
    return <span>Error: {getMemoryResult.error.message}</span>;
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>;
  }

  if (!getMemoryResult.data?.memory) {
    return <span>Idea not found</span>;
  }

  const memory = getMemoryResult.data.memory;
  const me = getMeResult.data?.me;

  if (!me) {
    return <span>Only for authorized</span>;
  }

  if (me.id !== memory.authorId) {
    return <span>An idea can only be edited by the author</span>;
  }

  return <EditMemoryComponent memory={memory} />;
};
