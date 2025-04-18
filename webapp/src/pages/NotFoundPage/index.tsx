import { ErrorPageComponent } from "../../components/ErrorPageComponent";

export const NotFoundPage = ({
  title = "Not found",
  message = "Page not found",
}: {
  title?: string;
  message?: string;
}) => <ErrorPageComponent title={title} message={message} />;
