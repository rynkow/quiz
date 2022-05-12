import Question from "../interface/question.interface";
import {Card, Stack} from "react-bootstrap";
import React from "react";
import "./QuestionDisplay.css"

const QuestionDisplay = (props : {question: Question, children?: JSX.Element;}) => {

    console.log(props.question);
    return (
        <Card>
            <Card.Body>
                <Card.Title>{props.question.question}</Card.Title>
                {[...props.question.answers.entries()].map(([k,v]) =>{
                    return (
                        <Stack className="answer-stack" direction="horizontal" key={k}>
                            <input className="truth-indicator" type="checkbox" disabled={true} checked={v}/>
                            <Card.Text>{k}</Card.Text>
                        </Stack>
                    );
                })}
                {props.children}
            </Card.Body>
        </Card>

    );
}


export default QuestionDisplay;