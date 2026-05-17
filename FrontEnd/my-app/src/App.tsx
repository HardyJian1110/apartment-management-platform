import React, { useEffect, useState, Suspense } from "react";
import logo from "./logo.svg";
import { routes } from "./router";
import { RouterProvider } from "react-router-dom";
import { generatesRoutes } from "./utils/generatesRoutes";
import { useDispatch, useSelector } from "react-redux";
import { createBrowserRouter } from "react-router-dom";
import { getMenu } from "./api/users";
import { UseDispatch, UseSelector } from "react-redux";
import { setMenu } from "./store/login/authSlice";
import { Spin } from "antd";
function App() {
  const [routerss, setRouter] = useState<any>(null);
  const dispatch = useDispatch();
  const { token } = useSelector((state: any) => state.authSlice);
  // useEffect(() => {
  //   async function loadData() {
  //     const { data } = await getMenu();
  //     if (data.length) {
  //       dispatch(setMenu(data));
  //       const routers = generatesRoutes(data); //Dynamically generated routing table
  //       const myRoutes = [...routes];
  //       myRoutes[0].children = routers;
  //       myRoutes[0].children[0].index = true;
  //       const router = createBrowserRouter(myRoutes);
  //       setRouter(router);
  //     } else {
  //       const router = createBrowserRouter(routes);
  //       setRouter(router);
  //       return;
  //     }
  //   }
  //   loadData();
  // }, [token]);
  useEffect(() => {
    async function loadData() {
      // 1. 💡 If not logged in, load the basic routes directly (including the login page) without calling the API.
      if (!token) {
        const router = createBrowserRouter(routes);
        setRouter(router);
        return;
      }

      // 2. Only runs here when a token exists
      try {
        const { data } = await getMenu();
        if (data && data.length) {
          dispatch(setMenu(data));
          const routers = generatesRoutes(data);
          const myRoutes = [...routes];
          myRoutes[0].children = routers;
          if (myRoutes[0].children[0]) {
            myRoutes[0].children[0].index = true;
          }
          setRouter(createBrowserRouter(myRoutes));
        } else {
          setRouter(createBrowserRouter(routes));
        }
      } catch (error) {
        // If the menu request fails (for example, token expired), still fall back to the basic routes
        setRouter(createBrowserRouter(routes));
      }
    }

    loadData();
  }, [token]);
  if (routerss) {
    return (
      <div className="App">
        <Suspense fallback={<Spin></Spin>}>
          <RouterProvider router={routerss} />;
        </Suspense>
      </div>
    );
  } else {
    return <Spin>Loading...</Spin>;
  }
}

export default App;

