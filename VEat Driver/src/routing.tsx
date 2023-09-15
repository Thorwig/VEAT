import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";

function RouteHandler(): JSX.Element {
  return (
    <Routes>
      <Route path={"/admin"} element={<HomePage />} />
      <Route path={"/"} element={<HomePage />} />
    </Routes>
  );
}

export default RouteHandler;
