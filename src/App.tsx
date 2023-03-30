import { Routes, Route } from "react-router-dom";
import "./App.scss";
import Home from "./components/Home";
import Layout from "./components/Layout";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./chakra/theme";
import Index from "./components/Chat";
import ProtectedRoutes from "./ProtectedRoutes";
import Dashboard from "./components/Dashboard";
import PageNotFound from "./components/PageNotFound";
import ViewProfile from "./components/User/ViewProfile";
import CreateProfile from "./components/User/CreateProfile";
import HomePage from "./components/HomePage";
import UpdateProfile from "./components/User/UpdateProfile";
import Fonts from "./chakra/Fonts";
import Testing from "./components/Testing";
import Login from "./components/AuthComponents/Login";
import Register from "./components/AuthComponents/Register";
import RegisterSpace from "./components/CoWorkingSpaceRegistration/Register";
import GenerateAccessKey from "./components/GenerateAccessKeyForVS/GenerateAccessKey";
import ResetPassword from "./components/Model/Auth/ResetPassword";
import LandingPage from "./components/LandingPage";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout>
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/home/:userId" element={<Home />} />
            <Route path="/chat" element={<Index />} />
            <Route path="/dashboard/:email" element={<Dashboard />} />
            <Route path="/create-profile/:email/:accessKey" element={<CreateProfile />} />
            <Route path="/profile/:id" element={<ViewProfile />} />
            <Route path="/update-profile/:id" element={<UpdateProfile />} />
          </Route>
          <Route path="/generate-access-key" element={<GenerateAccessKey />} />
          <Route path="/register-a-new-space" element={<RegisterSpace />} />
          <Route path="/user-login" element={<Login />} />
          <Route path="/user-register" element={<Register />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/*" element={<PageNotFound />} />
          <Route path="/testing" element={<Testing />} />
        </Routes>
      </Layout>
    </ChakraProvider>
  );
};

export default App;
