import Dashboard from "views/Dashboard.js";
import Icons from "views/Icons.js";
import UserPage from "views/UserPage.js";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: "design_app",
    component: <Dashboard />,
    layout: "/admin",
  },
  {
    path: "/icons",
    name: "Calendario",
    icon: "design_image",
    component: <Icons />,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "Perfil",
    icon: "users_single-02",
    component: <UserPage />,
    layout: "/admin",
  },
];

export default dashRoutes;
