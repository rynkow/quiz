import React from "react";
import {Container} from "react-bootstrap";
import User from "../interface/user.interface";
import UserForm from "../component/UserForm";
import "./Login.css"

export function Login(props: {setUser: (user: User) => void}){

    const onSubmit = (user: User) => {
        const requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa(user.name + ':' + user.password)}`,
            },
        };

        fetch('http://localhost:8080/user/login', requestOptions)
            .then(res => res.json())
            .then((data) => {
                props.setUser(data as User);
                console.log(data as User);
            })
    }

    return(
        <Container className="login-container">
            <UserForm onSubmit={onSubmit} buttonText={"Login"}/>
        </Container>
    );
}