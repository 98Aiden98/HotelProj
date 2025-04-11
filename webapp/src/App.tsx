import { Layout } from "./components/Layout";
import * as routes from "./lib/routes";
import { TrpcProvider } from "./lib/trpc";
import { AllMemoriesPage } from "./pages/AllMemoriesPage";
import { ViewMemoryPage } from "./pages/ViewMemoryPage";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './styles/global.scss'
import { NewMemoryPage } from "./pages/NewMemoryPage";
import { SignUpPage } from "./pages/SignUpPage";
export const App = () => {
  return ( 
    <TrpcProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />}/>
              <Route path={routes.getAllMemoriesRoute()} element={<AllMemoriesPage />}/>
              <Route path={routes.getNewMemoryRoute()} element={<NewMemoryPage />}/>
              <Route path={routes.getViewMemoryRoute(routes.viewMemoryRouteParams)} element={<ViewMemoryPage />}/>
            </Route>
            </Routes>
        </BrowserRouter>
    </TrpcProvider>
  );
};
