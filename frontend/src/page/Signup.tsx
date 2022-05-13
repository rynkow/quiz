import React, {useState} from "react";
import {Alert, Container} from "react-bootstrap";
import User from "../interface/user.interface";
import UserForm from "../component/UserForm";

export function Signup(props: {onSignup: (user: User)=>void}){
    const [message, setMessage] = useState("");

    const onSubmit = async (user: User) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        };

        const request = await fetch('http://localhost:8080/user', requestOptions);
        if (!request.ok){
            setMessage("SignUp unsuccessful");
            return;
        }
        user.role = "USER"
        props.onSignup(user);
        setMessage("SignUp successful");
    }

    return(
        <Container className="login-container">
            <Alert variant={message === "SignUp successful" ? "success" : "danger"} hidden={message === ""}>
                {message}
            </Alert>
            <UserForm onSubmit={onSubmit} buttonText={"SignUp"}/>
        </Container>

    );
}