import React, {useState} from "react";
import {Button, Container, Form, Modal, Stack} from "react-bootstrap";
import QuestionForm from "../component/QuestionForm";
import Question from "../interface/question.interface";
import QuestionDisplay from "../component/QuestionDisplay";
import User from "../interface/user.interface";
import Quiz from "../interface/quiz.interface";

export function QuizForm(props: { user: User, quiz: Quiz, onSave: (quiz: Quiz) => void }) {
    const [title, setTitle] = useState(props.quiz.title);
    const [description, setDescription] = useState(props.quiz.description);
    const [isPrivate, setPrivate] = useState(!props.quiz.isPublic);
    const [questions, setQuestions] = useState<Array<Question>>(props.quiz.questions);
    const [nexQuestionId, setNextQuestionId] = useState(0);
    const [showQuestionEditModal, setShowQuestionEditModal] = useState(false);
    const [editedQuestion, setEditedQuestion] = useState<Question>();

    const onSave = () => {
        const quiz: Quiz = {
            id: props.quiz.id,
            title: title,
            description: description,
            author: props.user.name,
            isPublic: !isPrivate,
            questions: questions,
        }

        for (let i = 0; i < quiz.questions.length; i++) {
            if ((quiz.questions[i].id ?? "").startsWith("newQuestion: ")) {
                quiz.questions[i].id = null;
            }
        }

        console.log("TOSAVE", quiz);

        props.onSave(quiz);
    }


    const onQuestionSubmit = (submittedQuestion: Question) => {
        const newQuestions = questions.map((question) => (question.id === submittedQuestion.id) ? submittedQuestion : question);
        setQuestions(newQuestions);
        setShowQuestionEditModal(false);
    }

    const deleteQuestion = (deletedQuestion: Question) => {
        const newQuestions = questions.filter((question) => (question.id !== deletedQuestion.id));
        setQuestions(newQuestions);
    }

    const newQuestionForm = () => {
        const question = {
            id: `newQuestion: ${nexQuestionId.toString()}`,
            question: "",
            answers: new Map(),
            isMultipleChoice: false,
            correctAnswers: 0,
            wrongAnswers: 0,
            needsReview: false,
        } as Question

        setNextQuestionId(nexQuestionId + 1);
        setQuestions([...questions, question]);
        setEditedQuestion(question);
        setShowQuestionEditModal(true);
    }


    const questionForms = questions.map((question) => {
        return (
            question.question === "" ? undefined :
                <QuestionDisplay key={question.id} question={question}>
                    <Stack direction="horizontal" gap={1}>
                        <Button className="ms-auto" variant="outline-dark" onClick={() => {
                            setEditedQuestion(question);
                            setShowQuestionEditModal(true)
                        }}>Edit</Button>
                        <Button variant={"outline-danger"} onClick={() => deleteQuestion(question)}>Delete</Button>
                    </Stack>
                </QuestionDisplay>

        );
    });

    return (
        <Container>
            <Modal
                show={showQuestionEditModal}
                onHide={() => setShowQuestionEditModal(false)}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Edit Question</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <QuestionForm
                        question={editedQuestion as Question}
                        onSubmit={(q) => onQuestionSubmit(q)}
                    ></QuestionForm>
                </Modal.Body>
            </Modal>

            <Form>
                <Form.Group className="mb-3" controlId="formQuizTitle">
                    <Form.Label>Quiz Title</Form.Label>
                    <Form.Control
                        type="string"
                        placeholder="Title"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formQuizDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea" rows={3}
                        type="string"
                        placeholder="Description"
                        value={description}
                        onChange={(event) => setDescription(event.target.value)}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Check
                        checked={isPrivate}
                        onChange={(e) => setPrivate(e.target.checked)}
                        type="switch"
                        id="private-switch"
                        label="Private"
                    />
                </Form.Group>

                <Container className="container-questions">
                    {questionForms}
                </Container>

                <Button variant="dark" onClick={onSave}>
                    Save
                </Button>
                {' '}
                <Button variant="dark" onClick={newQuestionForm}>
                    Add Question
                </Button>
            </Form>
        </Container>
    );
}