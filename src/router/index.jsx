import MainLayout from "../layouts/MainLayout";
import BillList from "../pages/bill-list";
import Home from "../pages/home";
const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/bill-list",
        element: <BillList />,
      },
    ],
  },
];
export default routes;
