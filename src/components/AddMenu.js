import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {db} from '../config/firebase'
import {storage} from '../config/firebase'
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

import { useLocation, useNavigate } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import '../components/AddMenu.css'
import { addDoc, collection } from 'firebase/firestore';
import logos from '../components/logo192.png'
import KeyboardBackspaceSharpIcon from '@mui/icons-material/KeyboardBackspaceSharp';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding:"3%",
      border:"soild",
      backgroundColor:""
    },
    but:{
         marginTop:10,
         backgroundColor: 'black'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      display: 'hidden'
    },
    title: {
      flexGrow: 1,
      alignItems:'center',
   
    
    },
    appButton:{
      backgroundColor:'black',
       
    }
  }));

//function
const AddMenu = () => {

const navigate = useNavigate()
const [_name, setName] = useState("")
const [_category, setCategory] = useState("")
const [_descrip, setDescrip] = useState("")
const [_price, setPrice] = useState('')

const [_picture, setPicture] = useState("")
const [percent, setPercent] = useState(0);

    //picture function
    // Handles input change event and updates state
    function handleChange(event) {
      setPicture(event.target.files[0]);
  }    
  

// const addHotelRef = collection(db,'hotels')
//function to add hotel
const addMenu= () =>{
  /////
    //adding picture to firebase
    if (!_picture) {
      alert("Please upload an image first!");
  }

  const storageRef = ref(storage, `/files/${_picture.name}`);
         // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, _picture);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                    // update progress
                    setPercent(percent);
                  },
                  (err) => console.log(err),
                  () => {
                      // download url
            getDownloadURL(uploadTask.snapshot.ref).then((url) => {
              console.log(url);
              const addMenuRef = collection(db, 'menus')
              const menu = {
                name: _name,
                category: _category,
                description: _descrip,
                price: _price,
                
                picture: url
              };
              addDoc(addMenuRef, menu).then(() => {
                console.log('added')
                alert('added successfully')
                navigate("/admin")
              }).catch((errr) => {
                console.log(errr)
              


            });
                      });
  }
              );
}
  
   ///////
    //data to push to firestore
    // const hotel ={
    //     name: _name,
    //     location:_location,
    //     description:_descrip,
    //     price:_price,
    //     room:_availableRooms,
    //     picture:_picture.name,
        
    
        
        // picture:_picture

//}
  

//     //push to firestore
//     addDoc(addHotelRef,hotel).then(()=>{
//         console.log('added')
//         alert('added successfully')
//         navigate("/admin")
//     }).catch((errr)=>{
//         console.log(errr)
//     })
  

// }


    const classes = useStyles();

    //for back button
    const back=(()=>{
      navigate("/admin")
    })



    return (
        <div>
               <AppBar position="static" className={classes.appButton}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                          
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                          Add Menu
                        </Typography>
                        {/* <Button className={classes.addButton} variant="contained" color="primary">
                            
                        </Button> */}
                    </Toolbar>
                </AppBar>
                <Button  className={classes.but}  variant="contained" color="primary" onClick={back} startIcon={<KeyboardBackspaceSharpIcon  />}></Button>
                <div>
                <div className='from'>
                <form className={classes.root} noValidate autoComplete="off">

                    < TextField id="outlined-basic" label="name" variant="standard" onChange={(e)=>setName(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" label="category" variant="standard" onChange={(e)=>setCategory(e.target.value)}  /><br></br>
                    <TextField id="outlined-basic" label="description" variant="standard" onChange={(e)=>setDescrip(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" label="Price" variant="standard" onChange={(e)=>setPrice(e.target.value)} type="number" /><br></br>
                   <br></br>
              {/* <label for="mypic">
                <img src={logos} id="img"/>
              </label> */}
              {/* <input type="file" id="mypic" class="hidden" onchange={handleImage   }/> */}
              <input type="file" accept="image/*" onChange={handleChange}/><br></br>
              <p>{percent} "% done"</p><br></br>
     
              <Button onClick={(e)=>{addMenu()}} className={classes.but}  variant="contained" color="primary">

                    ADD
                </Button>
                
                </form>
                </div>
                </div>
               
        </div>
        
    );
}

export default AddMenu;
