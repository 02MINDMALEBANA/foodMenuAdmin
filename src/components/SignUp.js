import React,{useEffect, useState} from 'react'

import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../config/firebase'
import {collection, addDoc, query, where, getDocs} from 'firebase/firestore';
import {db} from '../config/firebase';

import { async } from '@firebase/util';
import {useHistory} from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import profile from '../mediaContent/images.png'
import '../CSS/signup.css'


const SignUp = () =>{
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [_userName, setName] = useState('')
	const [_contact, setContact] = useState('')

	//register fuction 
	const navigate = useNavigate()
	const sign = () =>{
		createUserWithEmailAndPassword(auth,email,password).then((adminCredential)=>{
			     //getting user
				 const adminDetails = adminCredential.user;
				 const adminID = adminDetails.uid;
				
				console.log('user registered')
				navigate('/admin')

			 //adding personal details
			 const adminRef = collection(db, 'admins');
			 const admin = {
				 adminId:adminID,
				 adminName: _userName,
				 adminEmail: email,
				 adminContact: _contact,
			 }
			     //sending data to firebase 
				 addDoc(adminRef,admin).then(()=>{
					console.log('details addedd')
				}).catch((error)=>{
					console.log(error)
				})
			
		}).catch((err)=>{
			console.log(err)
		})
	}

	 
	return(
		 <>
		      <div className="signForm">
                <p id="ppp">REGISTRATION FORM</p>
                <label>
                <img src={profile} id="img"></img>
                </label>
                <input id='myinputs' placeholder='Enter your Name' onChange={(e)=>setName(e.target.value)}/><br></br>
				<input id='myinputs' placeholder='Enter your Contact Number' onChange={(e)=>setContact(e.target.value)}/><br></br>
                <input id='myinputs' placeholder='Enter your Email' onChange={(e)=>setEmail(e.target.value)}/><br></br>
                <input id='myinputs' placeholder='Enter your Password' onChange={(e)=>setPassword(e.target.value)}/><br></br>
             
                <br></br>

                <span style={{marginLeft:'120px'}}>Already have an account?
                    <Link to = '/'>Click here to Sign-In!</Link>
                </span>
                <button onClick={sign}>Submit</button>
            </div>
		 </>
		)
}

export default SignUp;