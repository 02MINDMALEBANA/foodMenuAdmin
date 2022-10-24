import logo from './logo.svg';
import './App.css';

import React, {useState,useEffect} from 'react';


import SignUp from './components/SignUp'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {onSnapshot, collection} from 'firebase/firestore'
import Admin from './components/Admin';
import Editpage from './components/Editpage';
import AddMenu from './components/AddMenu';
import ForgotPassword from './components/forgotPassword';

import {db} from './config/firebase';

import{getDocs} from 'firebase/firestore'
import Signin from './components/SignIn';

function App() {

  
  return (

    <Router>
    <Routes>
        <Route  path='/admin' element={<Admin />}></Route>
        <Route exact path='/' element={<Signin />}></Route>
        <Route  path='/signup' element={<SignUp />}></Route>
        <Route path='/forgot' element={<ForgotPassword />}></Route>
       
        <Route  path='/addmenu' element={<AddMenu />}></Route>
        <Route  path='/edit/:id' element={<Editpage/>}></Route>
        

    </Routes>
</Router>
  );
}

export default App;
