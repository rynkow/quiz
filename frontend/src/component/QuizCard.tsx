import Quiz from "../interface/quiz.interface";
import {Card, Button, ProgressBar} from "react-bootstrap";
import React from "react";
import {LinkContainer} from "react-router-bootstrap";
import "./QuizCard.css";

const QuizCard = (props: { quiz:Quiz }) => {
    let completionRate = props.quiz.questions.filter((question) => !question.needsReview).length / props.quiz.questions.length * 100;
    return (
        <Card
            bg="light"
            text="dark"
            className="mb-2"
        >
            <Card.Body>
                <Card.Title> {props.quiz.title} </Card.Title>
                <Card.Subtitle> {`by ${props.quiz.author}`} </Card.Subtitle>
                <Card.Text>
                    {props.quiz.description}
                </Card.Text>
                <LinkContainer to={`/details/${props.quiz.id}`}>
                    <Button variant="dark">Details</Button>
                </LinkContainer>
                {' '}
                <LinkContainer to={`/solve/${props.quiz.id}`}>
                    <Button variant="dark">Solve</Button>
                </LinkContainer>
                {' '}
                <LinkContainer to={`/edit/${props.quiz.id}`}>
                    <Button variant="dark">Edit</Button>
                </LinkContainer>
            </Card.Body>
            <Card.Footer hidden={completionRate === 0 || props.quiz.questions.length === 0}>
                <label>Completion Rate{' '}</label>
                <ProgressBar>
                    <ProgressBar variant="success" now={completionRate} key={1} />
                    <ProgressBar variant="danger" now={100} key={2} />
                </ProgressBar>
            </Card.Footer>
        </Card>
    );
}

export default QuizCard;