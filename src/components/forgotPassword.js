


// import '../css/forgotPassword.css'
import {Link} from 'react-router-dom'
import {getAuth, sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../config/firebase'
import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import '../CSS/forgot.css'

function ForgotPassword(){

    const [email, setEmail]=useState('');

    const send=(()=>{
        sendPasswordResetEmail(auth, email).then(()=>{
            alert('email was sent with reset link')
            console.log('email was sent')
        }).catch((invalid)=>{
            console.log(invalid)
            alert(invalid)
        })
    })
    return(
        <div id="reset">
            <form className='forgot'>
                <p id='pass'>FORGOT PASSWORD</p>
                <h2>EMAIL</h2><br></br>
                <input type="email" placeholder='Enter valid Email' onChange={(e)=>setEmail(e.target.value)} id='forgotemail'/><br></br><br></br>
                <p id="msg">We will send you a Password  reset  link to your email</p>

              
                <button id='btn2' onClick={send}>Submit</button><br></br><br></br>
                <span id='linkspan'>Back to 
                    <Link to='/' id='linking'>login</Link>
                    {/* <a href='login.js' id='atag'>login</a> */}
                    {/* <Link>Login</Link> */}
                </span>

            </form>

          

        </div>
    )
}
export default ForgotPassword;