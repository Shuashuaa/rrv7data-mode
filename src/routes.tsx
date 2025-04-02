import { createBrowserRouter } from "react-router";
import { Suspense } from "react";
import Layout from "./pages/Layout";
import App from "./pages/App";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import Countries, { countriesLoader } from "./pages/Countries";
import Country, { CountryError, countryLoader } from "./pages/Country";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout, // Layout wraps routes with Navbar/Footer
    children: [
      { index: true, Component: App },
      { path: "about", Component: About },
      {
        path: "countries",
        children: [
          { index: true, loader: countriesLoader, Component: () => (
            <Suspense fallback={<div>Loading...</div>}>
              <Countries />
            </Suspense>
          ) },
          { path: ":countryName", loader: countryLoader, Component: Country, errorElement: <CountryError /> },
          // { path: "trending", Component: <ConcertsTrending /> },
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