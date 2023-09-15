import { Route, Routes } from "react-router-dom";
import RestaurantPage from "./pages/RestaurantPage";
import OrderPage from "./pages/OrderPage";
import OrderHistoryPage from "./pages/OrderHistoryPage";
import ProfilePage from "./pages/ProfilePage";
import CreateAccount from "./pages/CreateAccount";
import StatsPage from "./pages/StatsPage";
import NotFoundPage from "./pages/NotFoundPage";
export type Path =
  | "/"
  | "/order/:orderId"
  | "/order/history"
  | "/profile"
  | "/profile/create-account"
  | "/stats"
  | "*";

export const tp = (path: Path, replace?: string[]): Path | string => {
  if (!replace) {
    return path;
  }
  return replacePlaceholders(path, replace);
};

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
  return (
    <Routes>
      <Route path={tp("/")} element={<RestaurantPage />} />
      <Route path={tp("/order/:orderId")} element={<OrderPage />} />
      <Route path={tp("/order/history")} element={<OrderHistoryPage />} />
      <Route path={tp("/profile")} element={<ProfilePage />} />
      <Route path={tp("/profile/create-account")} element={<CreateAccount />} />
      <Route path={tp("/stats")} element={<StatsPage />} />
      <Route path={tp("*")} element={<NotFoundPage />} />
    </Routes>
  );
}

export default RouteHandler;
