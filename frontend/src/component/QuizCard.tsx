import Quiz from "../interface/quiz.interface";
import {Card, Button} from "react-bootstrap";
import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import "./QuizCard.css";

const QuizCard = (prop: { quiz:Quiz }) => {


    return (
        <Card
            bg="light"
            text="dark"
            className="mb-2"
        >
            <Card.Body>
                <Card.Title> {prop.quiz.title} </Card.Title>
                <Card.Subtitle> {`by ${prop.quiz.author}`} </Card.Subtitle>
                <Card.Text>
                    {prop.quiz.description}
                </Card.Text>
                <LinkContainer to={`/details/${prop.quiz.id}`}>
                    <Button variant="dark">Details</Button>
                </LinkContainer>
                {' '}
                <LinkContainer to={`/solve/${prop.quiz.id}`}>
                    <Button variant="dark">Solve</Button>
                </LinkContainer>
                {' '}
                <LinkContainer to={`/edit/${prop.quiz.id}`}>
                    <Button variant="dark">Edit</Button>
                </LinkContainer>
                <hr/>

            </Card.Body>
        </Card>
    );
}

export default QuizCard;