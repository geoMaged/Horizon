import React, { useReducer } from 'react';
import Login from './components/Login';
import Article from './components/Article';
import Register from './components/Register';
import CreateArticle from './components/CreateArticle';
import Home from './components/Home';
import Nav from './components/Nav';
import Footer from './components/Footer';
import { Route, Switch,BrowserRouter as Router } from 'react-router-dom';
import { UserContext } from './components/UserContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import {initialState,authReducer} from './reducers/AuthReducer';
import NotFound from './components/NotFound';
import Bookmarks from './components/Bookmarks';
import MyArticles from './components/MyArticles';
import Author from './components/Author';
import About from './components/About';
import EditArticle from './components/EditArticle';

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
        <Route path='/about' exact component={About}/>
        <ProtectedRoute path='/editarticle' exact component={EditArticle}/>
        <Route  component={NotFound} />
    </Switch>
  <Footer />
  </UserContext.Provider>
  </Router>
)}

export default App;
