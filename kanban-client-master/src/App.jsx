import "react-loading-skeleton/dist/skeleton.css";
import Dashboard from "./Dashboard";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Login from "./components/Login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard></Dashboard>,
    children: [
      {
        path: "board/:id",
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
