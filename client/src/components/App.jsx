import React, { useReducer } from 'react';
import Login from './Login';
import Article from './Article';
import Register from './Register';
import CreateArticle from './CreateArticle';
import Home from './Home';
import Nav from './Nav';
import Footer from './Footer';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from './UserContext';
import { ProtectedRoute } from './ProtectedRoute';
import {initialState,authReducer} from '../reducers/AuthReducer';
import NotFound from './NotFound';
import Bookmarks from './Bookmarks';
import MyArticles from './MyArticles';
import Author from './Author';
import About from './About';

function App() {

  const [state,dispatch] = useReducer(authReducer,initialState);
  
return(
  <Router>
  <UserContext.Provider value={{
      state,
      dispatch
    }}
    >
    <Nav />
    <Switch>
        <Route path='/' exact component={Login} />
        <ProtectedRoute path='/createArticle' exact component={CreateArticle} />
        <Route path='/register' exact component={Register}/>
        <ProtectedRoute path='/home' exact component={Home} />
        <ProtectedRoute path='/articles/:id' exact children={<Article />}/>
        <ProtectedRoute path='/bookmarks' exact component={Bookmarks}/>
        <ProtectedRoute path='/myarticles' exact component={MyArticles}/>
        <ProtectedRoute path='/author' exact component={Author}/>
        <ProtectedRoute path='/about' exact component={About}/>
        <Route  component={NotFound} />
    </Switch>
  <Footer />
  </UserContext.Provider>
  </Router>
)}

export default App;
