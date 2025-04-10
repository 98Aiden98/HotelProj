import css from "./index.module.scss";
import { FormikProps } from "formik";

export const TextArea = ({
  name,
  label,
  formik,
}: {
  name: string;
  label: string;
  formik: FormikProps<any>;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <div style={{ marginBottom: 10 }}>
      <label className={css.label} htmlFor={name}>{label}</label>
      <br />
      <textarea
        className={css.textarea}
        onChange={(e) => {
          formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => void formik.setFieldTouched(name)}
        value={value}
        name={name}
        id={name}
        disabled={formik.isSubmitting}
      />
      {error && touched && <div style={{ color: "red" }}>{error}</div>}
    </div>
  );
};
