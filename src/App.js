import "./App.css";
import { Routes, Route, redirect, Navigate } from "react-router-dom";
import Home from "./Screens/Home/Home";
import Courses from "./Screens/Courses/Courses";
import Header from "./Components/Header/Header";
import Signup from "./Screens/Signup/Signup";

import { useSelector } from "react-redux";
function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route
          path="/"
          element={isLoggedIn ? <Navigate replace to="/courses" /> : <Home />}
        />
        <Route
          path="/courses"
          element={isLoggedIn ? <Courses /> : <Navigate replace to="/signup" />}
        />
        <Route
          path="/signup"
          element={
            !isLoggedIn ? <Signup /> : <Navigate replace to="/courses" />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
