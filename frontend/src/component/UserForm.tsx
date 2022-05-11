import {Button, Form} from "react-bootstrap";
import React, {useState} from "react";
import User from "../interface/user.interface";

const UserForm = (props: {onSubmit: (user: User) => void, buttonText: String}) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("")
    const onSubmit = () => {
        props.onSubmit({name: username, password: password});
    }


    return(
        <Form>
            <Form.Group className="mb-3" controlId="formUserName">
                <Form.Label>User name</Form.Label>
                <Form.Control
                    type="string"
                    placeholder="username"
                    value={username}
                    onChange={(event)=>setUsername(event.target.value)}
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUserPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(event)=>setPassword(event.target.value)}
                />
            </Form.Group>
            <Button variant="dark" onClick={onSubmit}>
                {props.buttonText}
            </Button>
        </Form>
    );
}

export default UserForm;