import { createBrowserRouter } from "react-router-dom";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import TodoList from "@/pages/TodoList";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "TodoList",
        element: <TodoList />,
      },
    ],
  },
]);

export default router;
