import './App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import { LinkContainer } from 'react-router-bootstrap';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {Home} from "./Home";
import {QuizList} from "./QuizList";
import {QuizCreationForm} from "./QuizCreationForm";
import {LoginForm} from "./LoginForm";
import {SignupForm} from "./SignupForm";

function App() {
  return (
      <BrowserRouter>

        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Container>
            <LinkContainer to="/">
              <Navbar.Brand >QuizApp</Navbar.Brand>
            </LinkContainer>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <LinkContainer to="/browse">
                  <Nav.Link>Browse</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/create">
                  <Nav.Link>Create</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav>
                <LinkContainer to="/login">
                  <Nav.Link>Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/signup">
                  <Nav.Link>SignUp</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

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
