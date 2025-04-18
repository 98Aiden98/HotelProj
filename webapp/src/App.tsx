import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { AppContextProvider } from "./lib/ctx";
import * as routes from "./lib/routes";
import { TrpcProvider } from "./lib/trpc";
import { SignInPage } from "./pages/auth/SignInPage";
import { SignOutPage } from "./pages/auth/SignOutPage";
import { SignUpPage } from "./pages/auth/SignUpPage";
import { AllMemoriesPage } from "./pages/memories/AllMemoriesPage";
import "./styles/global.scss";
import { EditMemoryPage } from "./pages/memories/EditMemoryPage";
import { NewMemoryPage } from "./pages/memories/NewMemoryPage";
import { ViewMemoryPage } from "./pages/memories/ViewMemoryPage";
import { NotFoundPage } from "./pages/other/NotFoundPage";
export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route
                path={routes.getAllMemoriesRoute()}
                element={<AllMemoriesPage />}
              />
              <Route
                path={routes.getNewMemoryRoute()}
                element={<NewMemoryPage />}
              />
              <Route
                path={routes.getEditMemoryRoute(routes.editMemoryRouteParams)}
                element={<EditMemoryPage />}
              />
              <Route
                path={routes.getViewMemoryRoute(routes.viewMemoryRouteParams)}
                element={<ViewMemoryPage />}
              />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  );
};
