import { BrowserRouter as Router, Route, Routes , Navigate} from "react-router-dom";

import All from "./pages/All";
import AssetForm from "./pages/AddTool";
import FormShow from "./pages/Tool";
import Assets from "./pages/Assets";
import Manage from "./pages/Manage";
import AssetDetails from "./pages/AssetDetails";
import Future from "./pages/Future";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
// import ForgotPassword from "./pages/ForgetPassword";
import Layout from "./Layouts/Layout";

import "./index.css";


function App() {
  return (
    <>
      <Router>
        <Routes>
        <Route path="/" element={<Navigate to="/auth/login" replace />} />
          <Route path="/auth">
            <Route path="login" element={<Login />} />
            {/* <Route path="forgot-password" element={<ForgotPassword />} /> */}
          </Route>
          
          <Route path="/dashboard" element={<Layout />}>
           
            <Route index element={<All />} />
            <Route path="assets" element={<Assets />} />
            <Route path="tool/:assetID" element={<FormShow />} />
            <Route path="addtool" element={<AssetForm />} />
            <Route path="manage" element={<Manage />} />
            <Route path="asset/:assetID" element={<AssetDetails />} />
            <Route path="future" element={<Future />} />
            <Route path="profile" element={<Profile />} />
            <Route
              path="*"
              element={
                <div className="text-center py-12">
                  <h1 className="text-5xl text-red-500 font-bold">404</h1>
                  <p className="mt-4 text-lg">
                    Oops! The page you're looking for does not exist.
                  </p>
                  <button
                    className="mt-6 px-5 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                    onClick={() => (window.location.href = "/")}
                  >
                    Go to Home
                  </button>
                </div>
              }
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
