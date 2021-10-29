import React, { useState } from 'react';
import Signup from './Signup';
import {
    Button,
    TextField,
    OutlinedInput,
    FormControl,
    InputLabel,
    Typography,
    makeStyles,
    InputAdornment,
    IconButton,
    
} from '@material-ui/core';
import { Visibility , VisibilityOff } from '@material-ui/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
var token = ''
const useStyles = makeStyles({
    mainContainer : {
        display:"grid",
        justifyContent:"center",
        position:"relative",
        zIndex: 5
    },
    formContainer:{
        position:"relative",
        width:"23rem",
        height:"auto",
        justifyContent:"center",
        padding:"10px",
    },
    inputbox:{
     marginBottom:"1rem",
     width:"100%",
     borderColor:"blue"
    },
    signbtn:{
        width:"100%",
        height:"2.5rem",
        background : "#95a6fe",
        color:"black",
        fontSize:"1.1rem"
    },
    disablesignbtn:{
        background:"rgb(149, 166, 254, 0.5)",
        width:"100%",
        height:"2.5rem",
        color:"black",
        fontSize:"1.1rem"
    }
})


const Login =() =>  {
    
    
    const [email,setEmail] = useState("")
    const [password, setPassword] = useState("")
 
    const [showPassVal , setshowPass] = useState({
        showPassword:false
    });
    const handleClickSP = () =>{
        setshowPass({
            showPassword: !showPassVal.showPassword
        })
    }

    async function Loginform(){
        
        let item  = {email,password}
        console.warn(item)
        
         let resp = await fetch("http://dhirajssh.pythonanywhere.com/api/token/",{
            method:"POST",
            body:JSON.stringify(item),
            headers : {'Content-Type': 'application/json'}
        })
        resp = await resp.json()
          token = resp.access
          console.log(resp)
          console.log(token)
        
            localStorage.setItem('user',JSON.stringify(token));
            localStorage.getItem('user',JSON.stringify(token))
    }
   
   
    const classes = useStyles();
    return (
        <div className={classes.mainContainer}>
           <Typography variant = "h5"
           style={{color : "#000" , textAlign : "center",margin:"1.3rem 0 " ,backgroundColor:"#ffa77f" ,borderRadius:"5px"}}>
              Create an Account 
           </Typography>
           <div  className={classes.formContainer}>
           
           <form autoComplete="off">
                

               <TextField 
               className = {classes.inputbox}
               label="E-Mail"
               variant="outlined" 
               name= "email"
               required
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
               />
               
               <FormControl variant="outlined" className={classes.inputbox} required >
                   <InputLabel>Password</InputLabel>
                   <OutlinedInput
                   labelWidth = {70}
                   type={showPassVal.showPassword ? "test" : "password"}
                   name="password"
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   endAdornment={<InputAdornment position="end">
                        <IconButton edge="end"
                        onClick = {handleClickSP}>
                            {showPassVal.showPassword? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                        </InputAdornment>
                    }/>
                    
               </FormControl>

                 {
                  ( !email || !password 
                   ?(
                    <Button variant="contained" disabled className ={classes.disablesignbtn}  ><Signup/></Button>
                   ):(
                    <Button variant="contained"  className ={classes.signbtn}  
                    onClick={Loginform} 
                    ><Link to = "/BlogPage"><Signup/></Link></Button>
                ))
                    }       

                
           </form>
           </div>
        </div>
    )
    
}


export default Login





