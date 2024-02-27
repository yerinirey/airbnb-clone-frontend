import { createBrowserRouter } from "react-router-dom";
import Home from "./routes/Home";
import NotFound from "./routes/NotFound";
import Root from "./components/Root";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "",
        element: <Home />,
      },
    ],
  },
]);

export default router;
