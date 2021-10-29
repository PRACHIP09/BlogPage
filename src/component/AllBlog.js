import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  makeStyles,
  
} from '@material-ui/core';

import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { experimentalStyled as styled } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import { height } from "@mui/system";

const useStyles = makeStyles((theme) => 
({
  
  root:{
    "& .css-8iyf53-MuiPaper-root-MuiCard-root":{
      backgroundColor:"#b0ccc0"
    },
    "& .css-1aczowp-MuiButtonBase-root-MuiPaginationItem-root":{
      minWidth: "40px",
      height: "40px"
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
  
  const [image, setLoadImage] = useState([]);
  var token=localStorage.getItem('user')
  var tokens = token.replace(/['"]+/g, '');
  //var pages = localStorage.getItem('pages');
  useEffect(() => {
    loadList();
  }, [image]);
 

  {/*http://dhirajssh.pythonanywhere.com/api/blogs/*/}
 const loadList = async (page) => {
    const result = await axios.get(`http://dhirajssh.pythonanywhere.com/api/page?page=${page}`,{
      headers: {"Authorization": `Bearer ${tokens}`},
    })
    setLoadImage(result.data)
    
  };
  var tokens = token.replace(/['"]+/g, '');
  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

 /* const handleChange = async(page) => {
    console.log(page)
    localStorage.setItem('pages',JSON.stringify(page));
    
  }*/

  const classes = useStyles();
  return (
    <div  className={classes.root}>
      
          <div className={classes.mainContainer} style={{marginTop:"20px" ,marginLeft:"10px"}}>
              <Grid container spacing={4}>
                {image.results?.map(name => ( 
                <Grid item md={3}>
                <Card sx={{ width: 250 }}>
                <Typography gutterBottom variant="h5" component="div" style={{marginLeft:"20px"}}>{name.id} - {name.user_name}</Typography>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
                  /*src={"https://dhirajssh.pythonanywhere.com/" + name.image}*/
                  src={name.image}
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
                </CardActions>
                </Card>
                </Grid>
                ))}
                
              </Grid>
              
         
        </div>
        <div style={{justifyContent:"center",alignItems:"center" , marginTop:"15px" , marginLeft:"15px" , marginBottom:"20px"}}>
        <Pagination 
        count={5} 
        variant="outlined"
        onChange={e => loadList(e.target.textContent)} 
        color="secondary" 
        />
        </div>
      
      </div>
  );
}
export default MyBlog;





