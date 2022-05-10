import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./page/Home";
import {QuizList} from "./page/QuizList";
import {QuizCreationForm} from "./page/QuizCreationForm";
import {LoginForm} from "./page/LoginForm";
import {SignupForm} from "./page/SignupForm";
import React from 'react';
import {Container} from "react-bootstrap";
import QuizAppNavbar from "./component/QuizAppNavbar";

function App() {
  return (
      <BrowserRouter>
        <QuizAppNavbar/>

        <Container>
          <Routes>
            <Route path="/browse" element={<QuizList/>}/>
            <Route path="/create" element={<QuizCreationForm/>}/>
            <Route path="/login" element={<LoginForm/>}/>
            <Route path="/signup" element={<SignupForm/>}/>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </Container>

      </BrowserRouter>
  );
}

export default App;
