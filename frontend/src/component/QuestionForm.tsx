import {Button, Card, Container, Form, Stack, CloseButton} from "react-bootstrap";
import React, {useState} from "react";
import Question from "../interface/question.interface";
import "./QuestionForm.css"

const QuestionForm = (props: {question: Question, onSubmit:(question:Question)=>void}) => {
    const [question, setQuestion] = useState(props.question.question);
    const [answers, setAnswers] = useState(new Map(props.question.answers));
    const [newAnswer, setNewAnswer] = useState("");
    const [isNewAnswerTrue, setIsNewAnswerTrue] = useState(false);

    const addAnswer = (answer: string, isTrue: boolean) => {
        setNewAnswer("");
        setIsNewAnswerTrue(false);
        setAnswers(new Map(answers.set(answer, isTrue)));
    }

    const getInputQuestion: ()=>Question = () => {
        return {
            id: props.question.id,
            question: question,
            answers: answers,
            isMultipleChoice: true,
            correctAnswers: 0,
            wrongAnswers: 0,
            needsReview: false,
        }
    }

    return (
        <Container>
            <Form.Group className="mb-3" controlId="formQuestionQuestion">
                    <Form.Label>Question</Form.Label>
                    <Form.Control
                        type="string"
                        as="textarea" rows={3}
                        placeholder="Type in the question"
                        value={question}
                        onChange={(event)=>setQuestion(event.target.value)}
                    />
                </Form.Group>
            <Form.Label>Answers</Form.Label>
            <Container>
                {[...answers.keys()].map((k) => (
                    <Stack className="answer-stack" direction="horizontal" key={k}>
                        <Form.Check className="truth-indicator" checked={answers.get(k)} onChange={(event)=>setAnswers(new Map(answers.set(k, event.target.checked)))}/>
                        <Card.Text>{k}</Card.Text>
                        <CloseButton style={{scale: '0.7'}} onClick={()=>{answers.delete(k); setAnswers(new Map(answers));}}/>
                    </Stack>
                ))}
                <Form.Group className="mb-3" controlId="formQuestionQuestion">
                    <Stack className="answer-stack" direction="horizontal">
                        <Form.Check
                            checked={isNewAnswerTrue}
                            onChange={() => setIsNewAnswerTrue(!isNewAnswerTrue)}
                            id="answer-switch"
                        />
                        <Form.Control
                            type="string"
                            placeholder="answer"
                            value={newAnswer}
                            onChange={(event)=>setNewAnswer(event.target.value)}
                        />
                    <Button disabled={newAnswer === ""} variant="outline-dark" onClick={() => addAnswer(newAnswer, isNewAnswerTrue)}>Add</Button>
                    </Stack>
                </Form.Group>
            </Container>
            <Button variant="dark" onClick={() => props.onSubmit(getInputQuestion())}>
                Save
            </Button>
        </Container>
    );
}

export default QuestionForm;