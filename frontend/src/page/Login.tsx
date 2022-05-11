import React, {useState} from "react";
import {Container, Alert} from "react-bootstrap";
import User from "../interface/user.interface";
import UserForm from "../component/UserForm";
import "./Login.css"

export function Login(props: {setUser: (user: User) => void}){
    const [message, setMessage] = useState("");

    const onSubmit = async (user: User) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa(user.name + ':' + user.password)}`,
            },
        };

       const request = await fetch('http://localhost:8080/user/login', requestOptions);
       if (!request.ok){
           setMessage("Login unsuccessful");
           return;
       }
       let userData: User = await request.json() as User;
       userData.password = user.password;
       props.setUser(userData);
       setMessage("Login successful");
    }

    return(
        <Container className="login-container">
            <Alert variant={message === "Login successful" ? "success" : "danger"} hidden={message === ""}>
                {message}
            </Alert>
            <UserForm onSubmit={onSubmit} buttonText={"Login"}/>
        </Container>

    );
}