import { ChakraProvider } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import "./App.scss";
import Fonts from "./chakra/Fonts";
import { theme } from "./chakra/theme";
import Dashboard from "./components/AdminComponents/Dashboard/Dashboard";
import GenerateAccessKey from "./components/AdminComponents/GenerateAccessKeyForVS/GenerateAccessKey";
import HomePage from "./components/HomePage";
import LandingPage from "./components/LandingPage";
import Layout from "./components/Layout";
import ResetPassword from "./components/Model/Auth/ResetPassword";
import PageNotFound from "./components/PageNotFound";
import ProtectedRoutes from "./ProtectedRoutes";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Layout>
        <Routes>

          <Route element={<ProtectedRoutes />}>
            <Route path="/*" element={<PageNotFound />} />
          </Route>

          <Route path="/generate-access-key" element={<GenerateAccessKey />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/password-reset" element={<ResetPassword />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/landing-page" element={<LandingPage />} />
          <Route path="/*" element={<PageNotFound />} />
        </Routes>
      </Layout>
    </ChakraProvider>
  );
};

export default App;
