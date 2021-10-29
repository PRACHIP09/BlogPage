import React, { useState} from 'react';
import Signup from './Signup';
import { useHistory } from 'react-router-dom';
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


const Register = ( ) => {
    
   
       
   

    const [first_name,setFirstName] = useState("")
    const [lastname,setLastName] = useState("")
    const [email,setEmail] = useState("")
    const [mobileno , setMobile] = useState("")
    const [password, setPassword] = useState("")
    const [confirmpassword , setConfirmPassword] = useState("")
    

    const [showPassVal , setshowPass] = useState({
        showPassword:false
    });
    const [showconfirmPassVal , setshowconfirmPass] = useState({
        showconfirmPassword:false
    });
    const handleClickSP = () =>{
        setshowPass({
            showPassword: !showPassVal.showPassword
        })
    }
    const handleconfirmClickSP = () =>{
        setshowconfirmPass({
            showconfirmPassword: !showconfirmPassVal.showconfirmPassword
        })
    }

    const signup = async ( ) => {
        const formData = new FormData();
        formData.append("first_name", first_name);
        formData.append("Last name", lastname);
        formData.append("mobileno", mobileno);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("confirmpassword", confirmpassword);

        await fetch("http://dhirajssh.pythonanywhere.com/api/user/register/", {
          method: "POST",
          body: formData,
        })
        .then((result)=>{
          console.log(result)
          if(result.status === 201){
              alert('You have Successfully registered on the website')
          }
          if(result.status !== 201){
            alert(`error  request - ${result.status} Failed to register . Try agian !!`)
        }
        }).catch(()=>{
          alert('Error in the Code');
        })
       
      };

    const classes = useStyles();
    return (
        <div className={classes.mainContainer}>
           <Typography variant = "h5"
           style={{color : "#000" , textAlign : "center",margin:"1.3rem 0 " ,backgroundColor:"#ffa77f" ,borderRadius:"5px",color:"#000" }}>
              Create an Account 
           </Typography>
           <div  className={classes.formContainer}>
           
           <form autoComplete="off">
               <TextField 
               className = {classes.inputbox}
               autoFocus="1"
               label="First Name"
               variant="outlined" 
               required
               name="firstname"
               value={first_name}
               onChange={(e)=>setFirstName(e.target.value)}
               />
              <TextField 
               className = {classes.inputbox}
               label="Last Name"
               variant="outlined" 
               name="lastname"
               value={lastname}
               onChange={(e)=>setLastName(e.target.value)}
               />
               
                
               <TextField 
               className = {classes.inputbox}
               label="Phone No"
               required
               variant="outlined" 
               name="mobileno"
               value={mobileno}
               onChange={(e)=>setMobile(e.target.value)}
               />
                

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


               <FormControl variant="outlined" className={classes.inputbox} required>
                   <InputLabel>Confirm Password</InputLabel>
                   <OutlinedInput
                   labelWidth = {140}
                   type={showconfirmPassVal.showconfirmPassword ? "test" : "password"}
                   name="confirmpassword"
                   value={confirmpassword}
                   onChange={(e)=>setConfirmPassword(e.target.value)}
                   endAdornment={<InputAdornment position="end">
                        <IconButton edge="end"
                        onClick = {handleconfirmClickSP}>
                            {showconfirmPassVal.showconfirmPassword? <Visibility/> : <VisibilityOff/>}
                        </IconButton>
                        </InputAdornment>
                    }/>
                   
               </FormControl>
               {
                  (!first_name || !email || !password || !confirmpassword || !mobileno ||
                   confirmpassword !== password
                   ?(
                    <Button variant="contained" disabled className ={classes.disablesignbtn} onClick={signup}  ><Signup/></Button>
                   ):(
                    <Button variant="contained"  className ={classes.signbtn} onClick={signup}  ><Link to ="/Login"><Signup/></Link></Button>
                
                ))
                    }
                
           </form>
           </div>
        </div>
    )
    
}

export default Register