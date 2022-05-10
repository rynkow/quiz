import {LinkContainer} from "react-router-bootstrap";
import React from "react";
import {Container, Nav, Navbar} from "react-bootstrap";
import './QuizAppNavbar.css'

const QuizAppNavbar = () => {
    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                            <Nav.Link>Create</Nav.Link>
                        </LinkContainer>
                    </Nav>
                    <Nav activeKey="">
                        <LinkContainer to="/login">
                            <Nav.Link href="/login">Login</Nav.Link>
                        </LinkContainer>
                        <LinkContainer to="/signup">
                            <Nav.Link>SignUp</Nav.Link>
                        </LinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default QuizAppNavbar;