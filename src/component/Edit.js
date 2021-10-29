import React,{useEffect,useState} from 'react'
import { useParams,useHistory } from 'react-router';
import axios from 'axios'; 
import {Link} from 'react-router-dom';
import {
  TextField,
  makeStyles,
  Button
  
} from '@material-ui/core';


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
      fontSize:"1.1rem",
      textDecoration:"none"
  },
  disablesignbtn:{
      background:"rgb(149, 166, 254, 0.5)",
      width:"100%",
      height:"2.5rem",
      color:"black",
      fontSize:"1.1rem"
  },

}));

/**/

const Edit = () => {
  const{id} = useParams();
  let history = useHistory();

var token=localStorage.getItem('user')
console.log(token)
var tokens = token.replace(/['"]+/g, '');
/*var etitle = localStorage.getItem('editTitle') ;
var edtitle = etitle.replace(/['"]+/g, '')
var edesc = localStorage.getItem('editdescp'); 
var edDescp = edesc.replace(/['"]+/g, '')*/

    const [image, setLoadImage] = useState(null)
    const [title, setTitle] = useState()
    const [description, setDescription] = useState()


    const updateBlog = async () => {
        let formField = new FormData()
        formField.append('image',image)
        formField.append('title',title)
        formField.append('description',description)
        await axios({
          method: 'PUT',
          url:`http://dhirajssh.pythonanywhere.com/api/blogs/detail/${id}/`,
          data: formField,
          headers: {"Authorization": `Bearer ${tokens}`}
          
        }).then(response=>{
          console.log(response.data);
          history.push('/')
        })

    }
    /*useEffect(() => {
      loadList();
    },[image]);*/
   
    /*const loadList = async () => {
      let result = await axios.get("http://dhirajssh.pythonanywhere.com/api/user/blogs/",{
        headers: {"Authorization": `Bearer ${tokens}`},
      });
      setLoadImage(result.data.reverse());
      console.log(result.data.length)
      for(var i=0;i<result.data.length;i++)
      {
        console.log({id})
        console.log(result.data[i].id)
        if(result.data[i].id == id)
        {
          console.log(result.data[i].title)
          localStorage.setItem('editTitle',JSON.stringify(result.data[i].title));
          localStorage.getItem('editTitle')
          localStorage.setItem('editdescp',JSON.stringify(result.data[i].description))
          
         
        }
      }
    };
   */
    const classes = useStyles();
    return (
    <div className = {classes.mainContainer}>
      <div className="container">
      <div className="w-75 mx-auto shadow p-5">
        <h2 className="text-center mb-4">edit Blog details of post - {id}</h2>
         

          <div className="form-group">
          
            <TextField 
              
               className = {classes.inputbox}
               label="Title"
               required
               variant="outlined" 
               name="title"
               value={title}
               onChange={(e)=>setTitle(e.target.value)}
             />
            </div>
           
        
         
          <div className="form-group">
             <TextField 
               className = {classes.inputbox}
               label="Description"
               required
               variant="outlined" 
               name="Description"
               value={description}
               onChange={(e)=>setDescription(e.target.value)}
             />
          </div>
          
          <div class="form-group">
             <TextField 
               className = {classes.inputbox}
               type="file"
               required
               variant="outlined" 
               name="Image"
               onChange={(e)=>setLoadImage(e.target.files[0])}
             />
             </div>

          <Button className={classes.signbtn} onClick={()=>updateBlog()} ><Link to = "/MyBlogs" style={{textDecoration:"none"}}>Update Student</Link></Button>
       
      </div>
    </div>

    </div>
  )
}

export default Edit


