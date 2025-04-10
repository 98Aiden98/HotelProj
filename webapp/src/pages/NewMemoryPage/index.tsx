import { Segment } from "../../components/Segment";
import css from "./index.module.scss";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import { trpc } from "../../lib/trpc";
import { zCreateMemoryTrpcInput } from "@hotelproj/backend/src/router/createMemory/input";
import { useState } from "react";

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
        <Input name="name" label="Name" formik={formik} />
        <Input name="nick" label="Nick" formik={formik} />
        <Input name="description" label="Description" formik={formik} />

        <TextArea name="text" label="Text" formik={formik} />

        {!!submittingError && <div style={{ color: "red" }}>{submittingError}</div>}

        {successMessageVisible && (
          <div style={{ color: "green" }}>Memory created successfully</div>
        )}

        <button
          className={css.button}
          type="submit"
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? "Creating..." : "Create Memory"}
        </button>
      </form>
    </Segment>
  );
};
