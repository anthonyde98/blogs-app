import "./App.css"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/header/Header";
import SinglePost from "./pages/singlePost/SinglePost";
import Create from "./pages/create/Create";
import Index from "./pages/index/Index";
import MisPosts from "./pages/misPosts/MisPosts";
import Edit from "./pages/edit/Edit";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { useSelector, useDispatch } from "react-redux";
import { loginSuccess } from "./store/slices/userSlice"
import { ToastContainer } from 'react-toastify';
import BtnTop from "./components/btnTop/BtnTop";
import User from "./components/user/User";

function App() {
  const dispatch = useDispatch()
  let logged = false;
  const selector = useSelector((state) => state.userSlice);
  
  if(selector.auth.isAuth){
    logged = selector.auth.isAuth;
  }
  else{
    let user = JSON.parse(document.cookie.split("=").pop() || "{}");

    if(user.token && user.token !== ""){
      dispatch(loginSuccess());
    }
  }

  return (
    <Router>
      <div className="App">
        {
          logged ? 
          <>
            <Header />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/misPosts" element={<MisPosts />} />
              <Route path="/post/:id" element={<SinglePost />} />
              <Route path="/create" element={<Create />} />
              <Route path="/edit/:id" element={<Edit />} />
              <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
            <User />
          </>
          :
          <>
            <Routes>
             <Route path="/" element={<Login />} />
             <Route path="/register" element={<Register />} />
             <Route path="*" element={ <Navigate to="/" /> } />
            </Routes>
          </>
        }
      </div>
      <ToastContainer />
      <BtnTop />
    </Router>
  );
}

export default App;
