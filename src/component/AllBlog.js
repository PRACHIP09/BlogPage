import React, { useState, useEffect ,useContext} from "react";
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
import InfiniteScroll from "react-infinite-scroll-component";
import AuthContext from "./AuthContext";
import EndMsg from "./Endmsg";
import Loader from "./Loader";
import Comment from "./Comment";
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
  const [hasMore, sethasMore] = useState(true);
  const [page, setpage] = useState(2);

  let {authToken} = useContext(AuthContext)

  useEffect(() => {
    loadList();
  }, []);
 
 const loadList = async () => {
    const result = await axios.get(`http://dhirajssh.pythonanywhere.com/api/page?page=1`,{
      headers: {"Authorization": `Bearer ${authToken.access}`},
    })
    setLoadImage(result.data.results)

  };

  const fetchComments = async () => {
    const res = await axios.get(`http://dhirajssh.pythonanywhere.com/api/page?page=${page}`,{
      headers: {"Authorization": `Bearer ${authToken.access}`},
    })
    const data = await res.data.results
    //console.log(data)
    return data;
  };
  



  const fetchData = async () => {

    const commentsFormServer = await fetchComments();

    setLoadImage([...image, ...commentsFormServer]);
    if(commentsFormServer.length === 0 || commentsFormServer.length < 10) {
    sethasMore(false)
    }
    setpage(page + 1)
};

 // console.log(image)
  const classes = useStyles();
  return (

    <InfiniteScroll
    dataLength={10}
    next={fetchData}
    hasMore={hasMore}
    loader={<Loader/>}
    endMessage={<EndMsg />}
  >
     
    <div  className={classes.root}>
      
          <div className={classes.mainContainer} style={{marginTop:"20px" ,marginLeft:"10px"}}>
              <Grid container spacing={4}>
                {image?.map(name => (
                <Grid item md={3}>
                <Card sx={{ width: 250 }}>
                <Typography gutterBottom variant="h5" component="div" style={{marginLeft:"20px"}}>{name.id} - {name.user_name}</Typography>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  height="140"
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

        </div>
      
      </div>
      </InfiniteScroll>
  );
  
}
export default MyBlog;



