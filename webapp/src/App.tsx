import { Layout } from "./components/Layout";
import * as routes from "./lib/routes";
import { TrpcProvider } from "./lib/trpc";
import { AllMemoriesPage } from "./pages/AllMemoriesPage";
import { ViewMemoryPage } from "./pages/ViewMemoryPage";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './styles/global.scss'
import { NewMemoryPage } from "./pages/NewMemoryPage";
import { SignUpPage } from "./pages/SignUpPage";
import { SignInPage } from "./pages/SignInPage";
import { SignOutPage } from "./pages/SignOutPage";
export const App = () => {
  return ( 
    <TrpcProvider>
        <BrowserRouter>
          <Routes>
          <Route path={routes.getSignOutRoute()} element={<SignOutPage />}/>
            <Route element={<Layout/>}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />}/>
              <Route path={routes.getSignInRoute()} element={<SignInPage />}/>
              <Route path={routes.getAllMemoriesRoute()} element={<AllMemoriesPage />}/>
              <Route path={routes.getNewMemoryRoute()} element={<NewMemoryPage />}/>
              <Route path={routes.getViewMemoryRoute(routes.viewMemoryRouteParams)} element={<ViewMemoryPage />}/>
            </Route>
            </Routes>
        </BrowserRouter>
    </TrpcProvider>
  );
};
