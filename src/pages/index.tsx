import { lazy } from "react";
import { Routes, Route } from "react-router-dom";

const ClikClik = lazy(() => import("./ClikClik"));

const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<ClikClik />}></Route>
    </Routes>
  );
};

export default Routing;
