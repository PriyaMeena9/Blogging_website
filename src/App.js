import { useEffect, useState } from 'react';
import './App.css';
import './style.scss'
import './media-query.css'
import {Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import AddEditBlog from './pages/AddEditBlog';
import NotFound from './pages/NotFound';
import About from './pages/About';
import Header from './component/Header.1';
import Auth from './pages/Auth';
import {ToastContainer} from 'react-toastify';
import { auth } from './firebase';
import { useNavigate,Navigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
function App() {
  const navigate=useNavigate();
  const[active,setActive]=useState("home");
  const[user,setUser]=useState(null);
  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);
  const handleLogOut=()=>{
    signOut(auth).then(()=>{
      setUser(null);
      navigate("/auth");
      setActive("auth");
      
    })
  }
  return (
    <div className="App">
    <Header setActive={setActive} active={active} user={user} handleLogOut={handleLogOut}/>
    <ToastContainer position='top-center'/>
    
     <Routes>
    <Route path='/' element={<Home setActive={setActive} user={user}/>}/>
    <Route path='/detail/:id' element={<Detail setActive={setActive}/>}/>
    <Route path='/create' element={(user && user.uid)?<AddEditBlog user={user} setActive={setActive}/>:<Navigate  to="/"  setActive={()=>setActive("home")}/>}/>
    <Route path='/update/:id' element={(user && user.uid)?<AddEditBlog user={user} setActive={setActive}/>:<Navigate  to="/"  setActive={()=>setActive("home")}/>}/>
    <Route path='/about' element={<About/>}/>
    <Route path='*' element={<NotFound/>}/>
    <Route path='/auth' element={<Auth setActive={setActive} setUser={setUser}
    />  }/>
      </Routes>

    
    </div>
  );
}

export default App;
