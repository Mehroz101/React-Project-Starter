import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import {
  Home,
  Layout,
  Login,
  ProtectedRoute,
  Setting,
  Signup,
  Users,
} from "./utils/LazyLoadComponent";
import { Suspense } from "react";
import { ROUTES } from "./utils/routes";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <AppRoutes />
      </Suspense>
    </Router>
  );
}

function AppRoutes() {
  return (
    <Routes>
      <Route path={ROUTES.LOGIN} element={<Login />} />
      <Route path={ROUTES.SIGNUP} element={<Signup />} />
      <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
        <Route index element={<Home />} />
        <Route path={ROUTES.USERS} element={<Users />} />
        <Route path={ROUTES.SETTING} element={<Setting />} />
      </Route>
    </Routes>
  );
}

export default App;
