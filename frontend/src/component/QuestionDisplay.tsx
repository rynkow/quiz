import Question from "../interface/question.interface";
import {Card} from "react-bootstrap";
import React from "react";
import "./QuestionDisplay.css"
import AnswerList from "./AnswerList";

const QuestionDisplay = (props : {question: Question, children?: JSX.Element;}) => {

    console.log(props.question);
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.question.question}</Card.Title>
                <AnswerList answers={props.question.answers} static={true}/>
                    {props.children}
            </Card.Body>
        </Card>

    );
}


export default QuestionDisplay;