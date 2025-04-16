import { zSignInTrpcInput } from "@hotelproj/backend/src/router/signIn/input";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { Alert } from "../../components/Alert";
import { Button } from "../../components/Button";
import { FormItems } from "../../components/FormItems";
import { Input } from "../../components/Input";
import { Segment } from "../../components/Segment";
import { useForm } from "../../lib/form";
import { getAllMemoriesRoute } from "../../lib/routes";
import { trpc } from "../../lib/trpc";

export const SignInPage = () => {
  const navigate = useNavigate();
  const trpcUtils = trpc.useContext();
  const signIn = trpc.signIn.useMutation();
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      nick: "",
      password: "",
    },
    validationSchema: zSignInTrpcInput,
    onSubmit: async (values) => {
      const { token } = await signIn.mutateAsync(values);
      Cookies.set("token", token, { expires: 99999 });
      void trpcUtils.invalidate();
      navigate(getAllMemoriesRoute());
    },
    resetOnSuccess: false,
  });

  return (
    <Segment title="Sign In">
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input
            label="Password"
            name="password"
            type="password"
            formik={formik}
          />
          {!formik.isValid && !!formik.submitCount && (
            <Alert color="red">Some fields are invalid</Alert>
          )}
          <Alert {...alertProps} />
          <Button {...buttonProps}>Sign In</Button>
        </FormItems>
      </form>
    </Segment>
  );
};
