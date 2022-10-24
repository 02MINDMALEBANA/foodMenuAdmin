import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {db} from '../config/firebase'
import { useLocation, useNavigate } from "react-router-dom";

import { makeStyles } from '@material-ui/core/styles';

import '../components/AddMenu'
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { async } from '@firebase/util';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      padding:"3%",
    },
    but:{
         marginTop:10,
         backgroundColor: 'black'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      backgroundColor: 'black'
    },
    title: {
      flexGrow: 1,
      alignItems:'center'
    },
    addButton: {
        backgroundColor:'black'

    },
    appBar:{
        backgroundColor:'black'
    },
  }));

const Editpage = () => {

    const {id} = useParams()
    console.log(id)

    //fuction to get single doc
    const getDocDetails = async(id)=>{
        const docref = doc(db,'menus',id)
        try{
            const docSnap = await getDoc(docref);
             if(docSnap.exists()){
                console.log('available')
                setDetails(docSnap.data())
             }else{
                console.log('not available available')
             }

        }catch(err){
            console.log(err)
        }
    }

    //updateButton
    const update = async(id,_name)=>{
        const menuDoc = doc(db,'menus',id)

        const menu ={
            name: _name,
            category:_category,
            description:_descrip,
            price:_price
    
        }

        await updateDoc(menuDoc,menu).then(()=>{
            alert('updated successfully')
        }).catch(err=>{
            console.log(err)
        })
         
    }

    useEffect(()=>{
        getDocDetails(id)

    },[])

            const [_name, setName] = useState("")
           const [_category, setCategory] = useState("")
           const [_descrip, setDescrip] = useState("")
            const [_price, setPrice] = useState("")
          const classes = useStyles();
          const [details, setDetails] = useState([])
    return (
        <div>
                <AppBar position="static" className={classes.appBar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                          
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                          Edit Menu
                        </Typography>
                        <Button className={classes.addButton} variant="contained" color="primary">
                            
                        </Button>
                    </Toolbar>
                </AppBar>

                <div>
                <div className='from'>
                <form className={classes.root} noValidate autoComplete="off">

                    {/* <TextField id="outlined-basic" label={details.name} variant="standard" onChange={(e)=>setName(e.target.value)} /><br></br> */}
                    <TextField id="outlined-basic" Value={details._name} label="name" variant="standard" onChange={(e)=>setName(e.target.value)}  /><br></br>
                    <TextField id="outlined-basic" value={details._category} label="category" variant="standard" onChange={(e)=>setCategory(e.target.value)}  /><br></br>
                    <TextField id="outlined-basic" value={details._descrip} label="description" variant="standard" onChange={(e)=>setDescrip(e.target.value)} /><br></br>
                    <TextField id="outlined-basic" value={_price} label="Amount" variant="standard" onChange={(e)=>setPrice(e.target.value)}  /><br></br>
                    {/* <TextField id="outlined-basic" value={details._price} label="Amount" variant="standard" onChange={(e)=>{setPrice(details => ({ ...details, _price: e.target.value})  )}}  /><br></br> */}
     
                    <Button onClick={(e)=>{update(id,_name)}}  className={classes.but}  variant="contained" color="primary">
                    UPDATE
                </Button>
                </form>
                </div>
                </div>
        </div>
    );
}

export default Editpage;
