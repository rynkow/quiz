import {LinkContainer} from "react-router-bootstrap";
import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import './QuizAppNavbar.css'

const QuizAppNavbar = (props: {loggedIn: boolean, onLogout: ()=>void}) => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top">
            <Container>
                <LinkContainer to="/">
                    <Navbar.Brand >QuizApp</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" role="navigation">
                    <Nav className="me-auto" activeKey="">
                        <LinkContainer to="/browse">
                            <Nav.Link>Browse</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/create">
                            <Nav.Link disabled={!props.loggedIn}>Create</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav activeKey="">
                        <LinkContainer to="/login">
                            <Nav.Link hidden={props.loggedIn}>Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signup" >
                            <Nav.Link hidden={props.loggedIn}>SignUp</Nav.Link>
                        </LinkContainer>
                        <Nav.Link onClick={props.onLogout} hidden={!props.loggedIn}>Logout</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default QuizAppNavbar;