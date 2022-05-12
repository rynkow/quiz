import Quiz from "../interface/quiz.interface";
import {Card, ProgressBar} from "react-bootstrap";
import React from "react";
import "./QuizCard.css";

const QuizCard = (props: { quiz:Quiz, children: JSX.Element}) => {
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
                {props.children}
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