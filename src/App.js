import React from 'react';
import './App.css';
import { BrowserRouter as Router,
  Route,
  Redirect,
  Switch
 } from 'react-router-dom';
import Home from './component/Home'
import Register from './component/Register';
import Login from './component/Login';
import Navbar from './component/Navbar';
import BlogPage from './component/BlogPage';
import AllBlog from './component/AllBlog';
import MyBlog from './component/MyBlog';
import Edit from './component/Edit';
function App() {
  
  return (
    
     
       <Router>
        
       <main>
        <Switch>
          <Route path ="/" exact>
            <Navbar/>
            <Home/>
          </Route>
          <Route path ="/Register" exact>
          < Navbar/>
            <Register/>
          </Route>
          <Route path="/Login" exact >
            <Navbar/>
            <Login/>
          </Route>
          <Route path="/BlogPage" exact >
            <Navbar/>
            <BlogPage/>
          </Route>
          <Route path="/Blogs" exact >
            <Navbar/>
            <AllBlog/>
          </Route>
          <Route path="/MyBlogs" exact >
            <Navbar/>
            <MyBlog/>
          </Route>
          
          <Route path='/Edit/:id'>
            <Navbar/>
            <Edit/>
          </Route>

          <Redirect to="/" />
        </Switch>
        
      </main>
      </Router>
    
  );
}
  

export default App;
