import {Card, Stack} from "react-bootstrap";
import React from "react";

const AnswerList = (props: {answers: Map<string, boolean>, static: boolean}) => {
    return (
        <div>
            {[...props.answers.keys()].map((k) => (
                <Stack className="answer-stack" direction="horizontal" key={k}>
                    <input className="truth-indicator" type="checkbox" disabled={props.static} checked={props.answers.get(k)}/>
                    <Card.Text>{k}</Card.Text>
                </Stack>
            ))}
        </div>
    );

}

export default AnswerList;