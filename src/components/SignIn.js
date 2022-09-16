import React,{useEffect, useState} from 'react';
import {auth} from '../config/firebase'
import { getAuth, signInWithEmailAndPassword,signOut  } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import './SignIn.css'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
    root: {
        marginTop:20,
      '& > *': {
        margin: theme.spacing(1),
        marginLeft: '30px'
      },
    },
  }));

const Signin = () => {
    const navigate = useNavigate()
    const [email, setUserName] = useState('')
	const [password, setPassword] = useState('')


    const signIn = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
                console.log('signed in');
                navigate('/admin')

                // ...
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error)
            });
    }
  //
  const signout = ()=>{
    signOut(auth).then(() => {
        // Sign-out successful.
        console.log('signed out')
      }).catch((error) => {
        // An error happened.
        console.log( error)
      });
  }
  const classes = useStyles();


    return (

        <div className='loginDiv' id='log'>
           
            <div className='form'>
            <div className='login'>
            <p id='loginform'>LOGIN FORM</p>
                <input  type="email" id='myinputs' placeholder="username" onChange={(e) => setUserName(e.target.value)} /><br></br>
                <input type="password" placeholder="password" onChange={(e) => setPassword(e.target.value)} id='myinputs'/><br></br>

                <br></br>
                <span style={{marginLeft:'120px'}}>Forgot Password?
                    <Link to='/forgot'>Click here to create a new one!</Link>
                </span>
                <br></br><br></br>
                <span style={{marginLeft:'120px'}}>Don't have an account?
                    <Link to='/signup'>Click here to create an account!</Link>
                </span>
                <br></br>
                <button onClick={(e) => { signIn() }}>    Login</button>
              
                {/* <Button className={classes.root} onClick={(e) => { signIn() }} variant="contained" color="primary">
                     Login
                </Button> */}
              </div>
            
            </div>
            
          
        </div>
    );
}

export default Signin;
