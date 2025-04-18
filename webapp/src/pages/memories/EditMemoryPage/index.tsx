import { zUpdateMemoryTrpcInput } from "@hotelproj/backend/src/router/memories/updateMemory/input";
import pick from "lodash/pick";
import { useNavigate, useParams } from "react-router-dom";
import { Alert } from "../../../components/Alert";
import { Button } from "../../../components/Button";
import { FormItems } from "../../../components/FormItems";
import { Input } from "../../../components/Input";
import { Segment } from "../../../components/Segment";
import { TextArea } from "../../../components/TextArea";
import { useForm } from "../../../lib/form";
import { withPageWrapper } from "../../../lib/pageWrapper";
import {
  type EditMemoryRouteParams,
  getViewMemoryRoute,
} from "../../../lib/routes";
import { trpc } from "../../../lib/trpc";

export const EditMemoryPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { memoryId } = useParams() as EditMemoryRouteParams;
    return trpc.getMemory.useQuery({ memoryId });
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const memory = checkExists(queryResult.data.memory, "Memory not found");
    checkAccess(
      ctx.me?.id === memory.authorId,
      "An memory can only be edited by the author",
    );
    return {
      memory,
    };
  },
})(({ memory }) => {
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
});
