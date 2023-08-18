import "./App.css";

//router
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//context
import { BoolProvider } from "./context/BoolContext";

//components
import Header from "./components/Header";
import Footer from "./components/Footer";

//pages
import Register from "./pages/Register/Register";
import Home from "./pages/Homepage/Home";
import Login from "./pages/Login/Login";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage";

function App() {
  return (
    <BoolProvider>
      <div>
        <BrowserRouter>
          <Header />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route
                path="/restaurant/:name/:location/:rating/:delivery"
                element={<RestaurantPage />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </div>
    </BoolProvider>
  );
}

export default App;
