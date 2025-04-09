import { Segment } from "../../components/Segment";
import css from "./index.module.scss";
import { Input } from "../../components/Input";
import { TextArea } from "../../components/TextArea";
import { useFormik } from "formik";
import { withZodSchema } from "formik-validator-zod";
import zod from "zod";
import { trpc } from "../../lib/trpc";

export const NewMemoryPage = () => {
  const createMemory = trpc.createMemory.useMutation()

  const formik = useFormik({
    initialValues: {
      name: "",
      nick: "",
      description: "",
      text: "",
    },
    validate: withZodSchema(
      zod.object({
        name: zod.string().min(1, "Name is required"),
        nick: zod
          .string()
          .regex(
            /^[a-z0-9-]+$/,
            "Nick can only contain letters, numbers and dashes",
          )
          .min(1, "Nick is required"),
        description: zod.string().min(1, "Description is required"),
        text: zod.string().min(100, "Text must be at least 100 characters"),
      }),
    ),
    onSubmit: async (values) => {
      await createMemory.mutateAsync(values);
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
        <button className={css.button} type="submit">
          Create Memory
        </button>
      </form>
    </Segment>
  );
};
