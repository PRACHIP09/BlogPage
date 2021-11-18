import React, { useState, useEffect , useContext } from "react";
import axios from "axios";
import {
  TextField,
  makeStyles,
  
} from '@material-ui/core';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from "react-router-dom";
import useMeasure from 'react-use-measure'
import { useSpring, animated } from '@react-spring/web'
import styles from './styles.module.css'
import Swal from 'sweetalert2';
import AuthContext from "./AuthContext";

const useStyles = makeStyles((theme) => 
({
  
  root:{
    "& .css-8iyf53-MuiPaper-root-MuiCard-root":{
      backgroundColor:"#b0ccc0"
    }
  },

    mainContainer : {
      display:"grid",
      justifyContent:"center",
      position:"relative",
      zIndex: 5,
      marginTop:"15px"
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
  },

}));
    
 


  
 

function MyBlog() {
  const [image, setSelectedFile] = useState(null);
  const [load, setLoadImage] = useState([]);
  const [title, setName] = useState("");
  const [description, setDesc] = useState("");
  //var token=localStorage.getItem('authToken')

  let {authToken} = useContext(AuthContext)

  const [open, toggle] = useState(false)
  const [ref, { width }] = useMeasure()
  const props = useSpring({ width: open ? width : 0 })

  useEffect(() => {
    loadList();
  },[load]);
 
  const loadList = async () => {
    const result = await axios.get("http://dhirajssh.pythonanywhere.com/api/user/blogs/",{
      headers: {"Authorization": `Bearer ${authToken.access}`},
    });
    setLoadImage(result.data.reverse());

  };
  //console.log(token)
  //var tokens = token.replace(/['"]+/g, '');
 
  const handleSubmission = async (e) => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("title", title);
    formData.append("description", description);
    await fetch("http://dhirajssh.pythonanywhere.com/api/blogs/", {
      method: "POST",
      body: formData,
      headers: {"Authorization": `Bearer ${authToken.access}` },
    })
    .then((result)=>{
      loadList();
    })
    .catch(()=>{
      alert('Error in the Code');
    });
  };
 
  const deleteImage = (productId) => {
    Swal.fire({
        title: 'Are you Sure ?',
        text: "You won't be able to revert it !!",
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel'
    }).then(async (result) => {
        if (result.value) {
            try {
                
                axios.delete('http://dhirajssh.pythonanywhere.com/api/blogs/detail/'+productId , {
                  headers: {"Authorization": `Bearer ${authToken.access}`},
                })
                    Swal.fire(
                        'Deleted !',
                        'The Post has been deleted',
                        'success'
                    )
                   loadList();
            }
            catch (error) {
                console.log(error);
                Swal.fire({
                    type: 'error',
                    title: 'Error',
                    text: 'Hubo un error, vuelve a intentarlo'
                })
            }
        }
    })
  }




  const classes = useStyles();
  return (
    <div  className={classes.root}>
     
     
        

         <div  className={classes.mainContainer}>
            <div class="form-group ml-3"> 
            <TextField 
              autoFocus = "1"
               className = {classes.inputbox}
               label="Title"
               required
               variant="outlined" 
               name="title"
               value={title}
               onChange={(e)=>setName(e.target.value)}
             />
            </div>
           
 
         
             <div class="form-group">
             <TextField 
               className = {classes.inputbox}
               label="Description"
               required
               variant="outlined" 
               name="Description"
               value={description}
               onChange={(e)=>setDesc(e.target.value)}
             />
            </div>
          
           
             <div class="form-group">
             <TextField 
               className = {classes.inputbox}
               type="file"
               required
               variant="outlined" 
               name="Image"
               onChange={(e)=>setSelectedFile(e.target.files[0])}
             />
             </div>
          
 
           
            
             <div className={styles.container}>
              <div ref={ref} className={styles.main} onClick={() => toggle(!open)}>
              <animated.div className={styles.fill} style={props} />
              <animated.div className={styles.content} onClick={handleSubmission}> Post the blog </animated.div>
              </div>
            </div>
          </div>
           
        
      
          <div className={classes.mainContainer} style={{marginTop:"20px" ,marginLeft:"10px" ,marginBottom:"30px"}}>
              <Grid container spacing={4}>
                
                  {load.map((name) => ( 
                    <Grid item md={3}>
                <Card sx={{ width: 250 }}>
                <Typography gutterBottom variant="h5" component="div" style={{marginLeft:"20px"}}>{name.id}</Typography>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  src={"https://dhirajssh.pythonanywhere.com/" + name.image}
                />
                <CardContent>
               
                  <Typography gutterBottom variant="h5" component="div" >
                   {name.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {name.description}
                    </Typography>
                </CardContent>
                <CardActions>
                  <Button  onClick={() => deleteImage(name.id)} style={{color:"red" , borderColor:"red"}} variant="h3"> Delete</Button>
                  <Button size="small"><Link to ={`/Edit/${name.id}`} style={{textDecoration:"none" , color:"blue"}}>Edit</Link></Button>
                </CardActions>
                </Card>
                </Grid>
                ))}
                
              </Grid>
              
         
        </div>
      
      </div>
  );
}
export default MyBlog;
