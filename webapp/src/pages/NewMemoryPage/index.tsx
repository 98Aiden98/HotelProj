import { Segment } from "../../components/Segment";
import css from "./index.module.scss";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { trpc } from "../../lib/trpc";
import { zCreateMemoryTrpcInput } from "@hotelproj/backend/src/router/createMemory/input";
import { useState } from "react";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";

export const NewMemoryPage = () => {
  const [successMessageVisible, setSuccessMessageVisible] = useState(false);
  const [submittingError, setSubmittingError] = useState<string | null>(null);
  const createMemory = trpc.createMemory.useMutation();

  const formik = useFormik({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validate: withZodSchema(zCreateMemoryTrpcInput),
    onSubmit: async (values) => {
      try {
        await createMemory.mutateAsync(values);
        formik.resetForm();
        setSuccessMessageVisible(true);
        setTimeout(() => {
          setSuccessMessageVisible(false);
        }, 3000);
      } catch (e: any) {
        setSubmittingError(e.message);
        setTimeout(() => {
          setSubmittingError(null);
        }, 3000);
      }
    },
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

          {!!submittingError && <Alert color="red">{submittingError}</Alert>}

          {!!successMessageVisible && (
            <Alert color="green">Memory created successfully</Alert>
          )}

          <Button loading={formik.isSubmitting}>Create Memory</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
