import React from "react";

const Home = React.lazy(() => import("./components/home/Home.jsx"));
const Search = React.lazy(() => import("./components/products/Search.jsx"));
const ProductsDetails = React.lazy(() => import("./components/products/ProductsDetails.jsx"));
const Products = React.lazy(() => import("./components/products/Products.jsx"));
const LoginSingUp = React.lazy(()=> import("./components/auth/loginSignup.jsx"));
const Account = React.lazy(()=> import("./components/auth/account.jsx"));
const ChangePassword = React.lazy(()=> import("./components/auth/changePassword.jsx"));
const UpdateProfile = React.lazy(()=> import("./components/auth/UpdateProfile.jsx"));


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
    component: Search 
  },
  {
    id: 3,
    name: "Products Details",
    path: "/product/:id",
    component: ProductsDetails 
  },
  {
    id: 4,
    name: "Products",
    path: "/products",
    component: Products 
  },
  {
    id: 5,
    name: "Products",
    path: "/products/:query",
    component: Products 
  },
  {
    id: 6,
    name: "Login",
    path: "/login",
    component: LoginSingUp 
  },
  {
    id: 7,
    name: "Account",
    path: "/account",
    component: Account  
  },
  {
    id: 8,
    name: "Change Password",
    path: "/change-password",
    component: ChangePassword  
  },
  {
    id: 9,
    name: "Update Profile",
    path: "/update-profile",
    component: UpdateProfile  
  }
 
];