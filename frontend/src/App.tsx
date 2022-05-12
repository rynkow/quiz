import './App.css';
import {Route, Routes, useNavigate} from "react-router-dom";
import {Home} from "./page/Home";
import {QuizList} from "./page/QuizList";
import {QuizCreationForm} from "./page/QuizCreationForm";
import {Login} from "./page/Login";
import {Signup} from "./page/Signup";
import React, {useState} from 'react';
import {Container} from "react-bootstrap";
import QuizAppNavbar from "./component/QuizAppNavbar";
import User from "./interface/user.interface";
import QuizDetails from "./page/QuizDetails";

function App() {
    const [user, setUser] = useState<User>();
    const navigate = useNavigate();
    return (
        <div>
            <QuizAppNavbar loggedIn={user !== undefined} onLogout={() => {setUser(undefined); navigate("/");}} />

            <Container>
                <Routes>
                    <Route path="/browse" element={<QuizList user={user}/>}/>
                    <Route path="/create" element={<QuizCreationForm user={user as User}/>}/>
                    <Route path="/login" element={<Login onLogin={(user: User) => setUser(user)}/>}/>
                    <Route path="/signup" element={<Signup onSignup={(user: User) => setUser(user)}/>}/>
                    <Route path="/details/:quizId" element={<QuizDetails user={user as User}/>}/>
                    <Route path="/" element={<Home/>}/>
                </Routes>
            </Container>
        </div>
    );
}

export default App;
