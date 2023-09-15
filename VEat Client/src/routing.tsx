import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MapPage from "./pages/MapPage";
import CartPage from "./pages/CartPage";
import ProfilePage from "./pages/ProfilePage";
import RestaurantPage from "./pages/RestaurantPage";
import NotFoundPage from "./pages/NotFoundPage";
import ForgotPassword from "./pages/ForgotPassword";
import CreateAccount from "./pages/CreateAccount";
import { useEffect, useState } from "react";
import { Tag } from "./api/common";
import ArticlePage from "./pages/ArticlePage";
import { Coordinates } from "./api/user";
import MenuPage from "./pages/MenuPage";
import { io } from "socket.io-client";

export type Path =
  | "/"
  | "/map"
  | "/restaurant/:restaurantId"
  | "/article/:articleId"
  | "/menu/:menuId"
  | "/cart"
  | "/profile"
  | "/profile/create-account"
  | "/profile/forgot-password"
  | "*";

export const tp = (path: Path, replace?: string[]): Path | string => {
  if (!replace) {
    return path;
  }
  return replacePlaceholders(path, replace);
};

const socket = io("localhost", {
  path: "/socket.io/",
  query: {
    clientId: "be86c86d-67af-411a-9334-db29a9229153",
  },
});

const replacePlaceholders = (url: Path, replaceArray: string[]): string => {
  const expression = /:[\w-_]+/g;
  const array = url.match(expression) as string[];
  if (array.length !== replaceArray.length) {
    throw new Error(
      `Expected array of ${array.length} strings. Found ${replaceArray.length}`
    );
  }
  let result = url.toString();
  for (let i = 0; i < array.length; i++) {
    result = result.replace(array[i], replaceArray[i]);
  }
  return result;
};

function RouteHandler(): JSX.Element {
  const [selectedFilterList, setSelectedFilterList] = useState<Tag[]>([]);
  const [userCoordinates, setUserCoordinates] = useState<
    Coordinates | undefined
  >();

  useEffect(() => {
    socket.on("message", (message) => {
      console.log("Received server message:", message);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position: GeolocationPosition) => {
        setUserCoordinates({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  const addFilter = (filter: Tag) => {
    setSelectedFilterList([...selectedFilterList, filter]);
  };

  const removeFilter = (filter: Tag) => {
    selectedFilterList.splice(selectedFilterList.indexOf(filter), 1);
    setSelectedFilterList([...selectedFilterList]);
  };

  return (
    <Routes>
      <Route
        path={tp("/")}
        element={
          <HomePage
            addFilter={addFilter}
            removeFilter={removeFilter}
            selectedFilterList={selectedFilterList}
            userCoordinates={userCoordinates}
          />
        }
      />
      <Route
        path={tp("/map")}
        element={
          <MapPage
            addFilter={addFilter}
            removeFilter={removeFilter}
            selectedFilterList={selectedFilterList}
            userCoordinates={userCoordinates}
          />
        }
      />
      <Route
        path={tp("/restaurant/:restaurantId")}
        element={<RestaurantPage />}
      />
      <Route path={tp("/article/:articleId")} element={<ArticlePage />} />
      <Route path={tp("/menu/:menuId")} element={<MenuPage />} />
      <Route path={tp("/cart")} element={<CartPage />} />
      <Route path={tp("/profile")} element={<ProfilePage />} />
      <Route path={tp("/profile/create-account")} element={<CreateAccount />} />
      <Route
        path={tp("/profile/forgot-password")}
        element={<ForgotPassword />}
      />
      <Route path={tp("*")} element={<NotFoundPage />} />
    </Routes>
  );
}

export default RouteHandler;
