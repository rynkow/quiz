import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Home} from "./page/Home";
import {QuizList} from "./page/QuizList";
import {QuizCreationForm} from "./page/QuizCreationForm";
import {Login} from "./page/Login";
import {SignupForm} from "./page/SignupForm";
import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import QuizAppNavbar from "./component/QuizAppNavbar";
import User from "./interface/user.interface";

function App() {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    return (
        <div>
        <QuizAppNavbar loggedIn={user !== undefined} onLogout={() => {setUser(undefined); navigate("/");}} />

        <Container>
          <Routes>
            <Route path="/browse" element={<QuizList/>}/>
            <Route path="/create" element={<QuizCreationForm/>}/>
            <Route path="/login" element={<Login setUser={(user: User) => setUser(user)}/>}/>
            <Route path="/signup" element={<SignupForm/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </Container>
        </div>
    );
}

export default App;
