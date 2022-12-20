import { Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import Layout from './components/Layout';
import { ChakraProvider } from "@chakra-ui/react"
import { theme } from './chakra/theme'
import { RecoilRoot } from 'recoil';
import Index from './components/Chat';
import ProtectedRoutes from './ProtectedRoutes';
import Dashboard from './components/Dashboard';
import PageNotFound from './components/PageNotFound';
import ViewProfile from './components/User/ViewProfile';
import CreateProfile from './components/User/CreateProfile';
import HomePage from './components/HomePage';
import UpdateProfile from './components/User/UpdateProfile';
import Fonts from './chakra/Fonts'
import Testing from './components/Testing'

const App: React.FC = () => {
  return (
    <RecoilRoot>
      <ChakraProvider theme={theme}>
        <Fonts />
        <Layout>
          <Routes>
            <Route element={<ProtectedRoutes />}>
              <Route path='/home/:userId' element={<Home />} />
              <Route path='/chat' element={<Index />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/create-profile' element={<CreateProfile />} />
              <Route path='/profile/:id' element={<ViewProfile />} />
              <Route path='/update-profile/:id' element={<UpdateProfile />} />
              <Route path='/*' element={<PageNotFound />} />
            </Route>
            <Route path='/' element={<HomePage />} />
            <Route path='/*' element={<PageNotFound />} />
            <Route path='/testing' element={<Testing />} />
          </Routes>
        </Layout>
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default App;