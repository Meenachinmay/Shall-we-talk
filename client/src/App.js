import './App.css';
import { Routes, Route } from "react-router-dom";

import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import { store, persistor } from './store'

import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Users from './components/Users'
import UserProfile from './components/UserProfile';

import LoginRegister from './pages/LoginRegister'
import Register from './pages/Register';
import Notification from './pages/Notification';
import SendMessage from './components/SendMessage';
import EditProfile from './pages/EditProfile';
import AccountActivation from './pages/AccountActivation';
import GraphqlTesting from './pages/GraphqlTesting';
import Firebase from './testing_experiment/firebase_testing/Firebase';

import ProtectedRoutes from './ProtectedRoutes';
import CreateProfile from './pages/CreateProfile';
import UserSettingsPage from './pages/UserSettingsPage';
import { useEffect } from 'react';

function App() {
  useEffect(() => {
    
  }, [])
  return (
    <Provider store={store}>
      <PersistGate loading="null" persistor={persistor}>
          <Navbar />
          <Routes>

            <Route element={<ProtectedRoutes />}>
              <Route path="/users" element={<Users />}/>
              <Route path='/notification' element={<Notification />} />
              <Route path='/send-message/:receiver_name/:receiver_id' element={<SendMessage />} />
              <Route path='/edit-profile/:user_id' element={<EditProfile />} />
              <Route path='/user-profile/:user_id' element={<UserProfile />} />
              <Route path='/create-new-user-profile/:user_id' element={<CreateProfile />}/>
              <Route path='/user-settings-page/:user_id' element={<UserSettingsPage />}/>
            </Route>

            <Route path="/" element={<HomePage /> }/>\
            <Route path='/auth/account-activation/:auth_token' element={<AccountActivation />} />
            <Route path='/login-register' element={<LoginRegister />} />
            <Route path='/register' element={<Register />} />
            <Route path='/graphql-testing' element={<GraphqlTesting/>} />
            <Route path='/firebase-testing' element={<Firebase />} />
          </Routes>
        </PersistGate>
    </Provider>
  );
}

export default App;
