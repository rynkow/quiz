import {Button, Card, Container, Form, ProgressBar, Stack} from "react-bootstrap";
import React, {useState} from "react";
import Question from "../interface/question.interface";
import "./ActiveQuestion.css"

const ActiveQuestion = (props: {
    question: Question,
    onValidation: (userAnswers: Map<string, boolean>) => void,
    onNext: (userAnswers: Map<string, boolean>) => void,
    onToggle: (newState: boolean, questionId: string) => void
}) => {
    const [userAnswers, setUserAnswers] = useState(new Map<string, boolean>());
    const [showValidation, setShowValidation] = useState(false);

    const onNext = () => {
        setShowValidation(false);
        props.onNext(userAnswers);
        setUserAnswers(new Map());
    }

    const toggleState = () => {
        props.question.needsReview = !props.question.needsReview;
        props.onToggle(props.question.needsReview, props.question.id as string);
        setUserAnswers(new Map(userAnswers));
    }

    const onValidate = () => {
        if (!showValidation) {
            props.onValidation(new Map(userAnswers));
            setShowValidation(true);
        }
    }

    const totalAnswers = props.question.correctAnswers + props.question.wrongAnswers;
    return (
        <div>
            <Container className="active-question-container">
                <Card.Text style={{fontSize: '1.3rem', paddingLeft: '5px'}}>{props.question.question}</Card.Text>
                <Form>
                    {[...props.question.answers.keys()].map((k) => {
                        const answerIsCorrect = (props.question.answers.get(k) === (userAnswers.get(k) ?? false));
                        let validationStyle = "";
                        if (showValidation)
                            validationStyle = (answerIsCorrect) ? "validate-correct" : "validate-false";
                        return (

                            <Stack
                                className={`answer-stack user-answer-stack ${validationStyle}`}
                                direction="horizontal" key={k}
                                onClick={() => setUserAnswers(new Map(userAnswers.set(k, !userAnswers.get(k) ?? true)))}
                            >
                                <Form.Group>
                                    <Form.Check
                                        className="truth-indicator"
                                        label={k}
                                        checked={userAnswers.get(k) ?? false}
                                        onChange={() => {
                                        }}
                                    />
                                </Form.Group>
                            </Stack>
                        );
                    })}

                </Form>
                <Card.Text style={{fontSize: '0.9rem', marginBottom: '2px'}}>Total question answers:</Card.Text>
                <ProgressBar>
                    <ProgressBar variant="success"
                                 now={(props.question.correctAnswers / (totalAnswers === 0 ? 1 : totalAnswers) * 100)}
                                 key={1} label={`Correct: ${props.question.correctAnswers}`}/>
                    <ProgressBar variant="danger"
                                 now={props.question.wrongAnswers / (totalAnswers === 0 ? 1 : totalAnswers) * 100}
                                 key={2} label={`Wrong: ${props.question.wrongAnswers}`}/>
                </ProgressBar>
                <Card.Text style={{fontSize: '0.9rem', marginBottom: '2px', marginTop: '3px'}}>Question
                    State:</Card.Text>
                <Card.Text
                    className={props.question.needsReview ? "state-needs-review" : "state-memorised"}>{props.question.needsReview ? "Needs Review" : "Memorised"}</Card.Text>


            </Container>
            <Card.Footer>
                <Stack className="active-question-button-stack" direction="horizontal" gap={2}>
                    <Button variant="dark"
                            onClick={toggleState}>{`Set state to ${!props.question.needsReview ? "Needs Review" : "Memorised"}`}</Button>
                    <Button variant="dark" onClick={onValidate}>Validate</Button>
                    <Button variant="dark" disabled={!showValidation} onClick={onNext}>Next</Button>
                </Stack>
            </Card.Footer>
        </div>

    );
}

export default ActiveQuestion;