import { zCreateMemoryTrpcInput } from "@hotelproj/backend/src/router/createMemory/input";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { TextArea } from "../../components/TextArea";
import { useForm } from "../../lib/form";
import { trpc } from "../../lib/trpc";

export const NewMemoryPage = () => {
  const createMemory = trpc.createMemory.useMutation();

  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validationSchema: zCreateMemoryTrpcInput,
    onSubmit: async (values) => {
      await createMemory.mutateAsync(values);
      formik.resetForm();
    },
    successMessage: "Memory created successfully",
    showValidationAlert: true,
  });

  return (
    <Segment title="New Memory">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
      >
        <FormItems>
          <Input name="name" label="Name" maxWidth={500} formik={formik} />
          <Input name="nick" label="Nick" maxWidth={500} formik={formik} />
          <Input
            name="description"
            label="Description"
            maxWidth={1000}
            formik={formik}
          />

          <TextArea name="text" label="Text" formik={formik} />

          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Memory</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
