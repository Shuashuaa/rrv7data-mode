import { createBrowserRouter } from "react-router";
import Layout from "./pages/Layout";
import App from "./pages/App";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Countries, { countriesLoader } from "./pages/Countries";
import Country, { CountryError, countryLoader } from "./pages/Country";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: App },
      { path: "about", Component: About },
      {
        path: "countries",
        children: [
          { 
            index: true, loader: 
            countriesLoader, 
            Component: Countries 
          },
          { 
            path: ":countryName", 
            loader: countryLoader, 
            Component: Country, 
            errorElement: <CountryError /> 
          },
        ]
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;