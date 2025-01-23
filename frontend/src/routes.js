import React from "react";

const Home = React.lazy(() => import("./components/home/Home.jsx"));
const Search = React.lazy(() => import("./components/products/Search.jsx"));

export const route = [
  {
    id: 1,
    name: "Home",
    path: "/",
    component: Home // Do not wrap with <Home /> here
  },
  {
    id: 2,
    name: "Search",
    path: "/search",
    component: Search // Do not wrap with <Home /> here
  }
];