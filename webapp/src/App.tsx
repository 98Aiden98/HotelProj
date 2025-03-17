import { Layout } from "./components/Layout";
import { getAllMemoriesRoute, getViewMemoryRoute, viewMemoryRouteParams } from "./lib/routes";
import { TrpcProvider } from "./lib/trpc";
import { AllMemoriesPage } from "./pages/AllMemoriesPage";
import { ViewMemoryPage } from "./pages/ViewMemoryPage";
import { BrowserRouter, Route, Routes} from 'react-router-dom'
import './styles/global.scss'
export const App = () => {
  return ( 
    <TrpcProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout/>}>
              <Route path={getAllMemoriesRoute()} element={<AllMemoriesPage />}/>
              <Route path={getViewMemoryRoute(viewMemoryRouteParams)} element={<ViewMemoryPage />}/>
            </Route>
            </Routes>
        </BrowserRouter>
    </TrpcProvider>
  );
};
