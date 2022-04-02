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
import AccountActiviation from './pages/AccountActivation';

import ProtectedRoutes from './ProtectedRoutes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading="null" persistor={persistor}>
          <Navbar />
          <Routes>

            <Route element={<ProtectedRoutes />}>
              <Route path="/users" element={<Users />}/>
              <Route path="/user-profile" element={<UserProfile />}/>
              <Route path='/notification' element={<Notification />} />
              <Route path='/send-message/:receiver_name/:receiver_id' element={<SendMessage />} />
              <Route path='/edit-profile' element={<EditProfile />} />
              <Route path='/activation' element={<AccountActiviation />} />
              <Route path='/user-profile/:user_id' element={<UserProfile />} />
            </Route>

            <Route path="/" element={<HomePage /> }/>
            <Route path='/login-register' element={<LoginRegister />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </PersistGate>
    </Provider>
  );
}

export default App;