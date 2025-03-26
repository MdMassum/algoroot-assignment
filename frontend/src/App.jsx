import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Login from "./pages/login-page/Login";
import Signup from "./pages/signup-page/Signup";
import PrivateRoute from "./components/PrivateRoute";
import ResetPassword from "./components/ResetPassword";
import Layout from "./layouts/Layout";
import Home from "./pages/home-page/Home";
import Profile from "./pages/profile/profile";


function App() {


  return (
      <BrowserRouter>
      <Routes>
            {/* Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/reset-password/:resetToken" element={<ResetPassword />} />
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>

  )
}

export default App
