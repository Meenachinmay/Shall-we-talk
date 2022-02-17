import React from 'react'
import Navbar from './core/Navbar';

import { Routes, Route } from 'react-router-dom'

import Profile from './core/Profile';
import Login from './core/Login';
import Register from './core/Register';
import Home from './core/Home'
import Activation from './core/Activation';
import UserProfile from './core/UserProfile';

import { PersistGate } from 'redux-persist/integration/react'

//redux implementation
import { Provider } from 'react-redux'
import { store, persistor } from './store'

import ProtectedRoutes from './ProtectedRoutes';
import ViewSelfProfile from './core/ViewSelfProfile';
import FlashMessage from './components/FlashMessage';
  
const App = () => {
  return (
      <Provider store={store}>
        <PersistGate loading="null" persistor={persistor}>
        <>
        <Navbar />
        <Routes>
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={ <Home /> } />
            <Route path="/profile" element={ <Profile /> } />
            <Route path="/user/:userid" element={<UserProfile />}/>
            <Route path="/view-self-profile" element={<ViewSelfProfile />}/>
          </Route>
          <Route path="/register" element={ <Register /> } />
          <Route path="/auth/activate/:token" element={<Activation />}/>
          <Route path="/login" element={ <Login /> } />
          <Route path="/flash-message" element={<FlashMessage />} />
        </Routes>
        </>
        </PersistGate>
    </Provider>
  )
}
export default App;
