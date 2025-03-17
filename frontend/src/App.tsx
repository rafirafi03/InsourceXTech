import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/User/Home";
import About from "./pages/Admin/About";
import Services from "./pages/Admin/Services";
import AddServices from "./pages/Admin/AddServices";
import Solutions from "./pages/Admin/Solutions";
import AddSolutions from "./pages/Admin/AddSolutions";
import WhyUs from "./pages/Admin/WhyUs";
import Login from "./pages/Admin/login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./routes/protectedRoute";
import PublicRoute from "./routes/publicRoute";

function App() {
  return (
    <>
      <ToastContainer position="top-center" autoClose={2000} />
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/addServices" element={<AddServices />} />
            <Route path="/solutions" element={<Solutions />} />
            <Route path="/addSolutions" element={<AddSolutions />} />
            <Route path="/whyUs" element={<WhyUs />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
