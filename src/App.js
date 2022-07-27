/* eslint-disable no-unused-vars */

import React from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from "./Chat";
import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">

    {!user ? (
     <Login />
    ): (
      <div className="app_body">
    <Router>
<Routes>
<Sidebar />

<Route path="/rooms/:roomId">
<Chat />
</Route>

<Route path="/">
<Chat />
</Route>

</Routes>
</Router>
    </div>
    )}
   
    </div>
  );
}

export default App;
