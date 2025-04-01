import { createBrowserRouter } from "react-router";

import Layout from "./components/Layout";
import App from "./App";
import About from "./components/About";
import NotFound from "./components/NotFound";
// import ConcertsHome from "./components/Concerts";
// import ConcertsCity from "./components/ConcertsCity";
// import ConcertsTrending from "./components/ConcertsTrending";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />, // Layout wraps routes with Navbar/Footer
    children: [
      { index: true, element: <App /> },
      { path: "about", element: <About /> },
      // {
      //   path: "concerts",
      //   children: [
      //     { index: true, element: <ConcertsHome /> },
      //     { path: ":city", element: <ConcertsCity /> },
      //     { path: "trending", element: <ConcertsTrending /> },
      //   ]
      // },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;