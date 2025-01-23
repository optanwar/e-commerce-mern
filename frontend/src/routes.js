import React from "react";

const Home = React.lazy(() => import("./components/home/Home.jsx"));

export const route = [
  {
    id: 1,
    name: "Home",
    path: "/",
    component: Home // Do not wrap with <Home /> here
  }
];