import React, {useEffect, useState} from "react";
import Quiz from "../interface/quiz.interface";
import User from "../interface/user.interface";
import {useNavigate, useParams} from "react-router-dom";
import QuestionDisplay from "../component/QuestionDisplay";
import FetchService from "../utils/fetchService";
import {Button, Card, Container, ProgressBar, Stack} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import "./QuizDetails.css"

const QuizDetails = (props: {user: User}) => {
    const [quiz, setQuiz] = useState<Quiz>();
    const {quizId} = useParams();
    const navigate = useNavigate();

    const authHeater = (props.user === undefined)
        ? ""
        : `Basic ${window.btoa(props.user.name + ':' + props.user.password)}`;

    const fetchQuiz = async () =>{
        if ( quizId === undefined)
            return undefined;

        const quiz: Quiz | undefined = await FetchService.fetchQuiz(quizId, authHeater);
        console.log(quiz);
        setQuiz(quiz);
    }

    const deleteQuiz = async () =>{
        if ( quizId === undefined)
            return false;

        const responseOk = await FetchService.deleteQuiz(quizId,  authHeater);
        if (responseOk){
            navigate("/browse");
        }
    }


    useEffect(() =>{
        fetchQuiz().then();
    }, []);

    const QuestionCards = (quiz !== undefined) ? quiz.questions.map((question) => {
        const totalAnswers = question.correctAnswers + question.wrongAnswers;
        return (

            <QuestionDisplay key={question.id} question={question}>
                <div hidden={props.user === undefined || totalAnswers === 0}>
                    <p style={{margin: '7px auto 0 0'}}>Total answer count:</p>
                    <ProgressBar>
                        <ProgressBar variant="success"
                                     now={(question.correctAnswers / (totalAnswers === 0 ? 1 : totalAnswers) * 100)}
                                     key={1} label={`Correct: ${question.correctAnswers}`}/>
                        <ProgressBar variant="danger"
                                     now={question.wrongAnswers / (totalAnswers === 0 ? 1 : totalAnswers) * 100}
                                     key={2} label={`Wrong: ${question.wrongAnswers}`}/>
                    </ProgressBar>
                    <p style={{margin: '7px auto 0 0'}}>Question State:</p>
                    <Card.Text className={question.needsReview ? "state-needs-review" : "state-memorised"}>
                        {question.needsReview ? "Needs Review" : "Memorised"}
                    </Card.Text>

                </div>

            </QuestionDisplay>
        );
    }) : undefined;

    const QuizHeader = (quiz !== undefined) ?
        <div>
            <h1 className="title">{quiz.title}</h1>
            <h4 className="author">{`by ${quiz.author}`}</h4>
            <Stack className="button-stack" direction={"horizontal"} gap={3}>
                <LinkContainer to={`/solve/${quiz.id}`}>
                    <Button variant="dark">Solve</Button>
                </LinkContainer>
                <LinkContainer to={`/edit/${quiz.id}`} >
                    <Button variant="dark"
                            hidden={(props.user === undefined) || props.user.name !== quiz.author}>Edit</Button>
                </LinkContainer>
                <Button
                    variant="danger"
                    onClick={deleteQuiz}
                    hidden={(props.user === undefined) || props.user.name !== quiz.author}
                >
                    Delete
                </Button>
            </Stack>
            <div hidden={props.user === undefined}>
                <h3>Quiz progress:<br/></h3>
                <ProgressBar style={{maxWidth: '512px'}}>
                    <ProgressBar variant="success"
                                 now={quiz.questions.filter(q => !q.needsReview).length / (quiz.questions.length) * 100}
                                 key={1}
                                 label={`Memorised: ${quiz.questions.filter(q => !q.needsReview).length}`}/>
                    <ProgressBar variant="danger"
                                 now={quiz.questions.filter(q => q.needsReview).length / (quiz.questions.length) * 100}
                                 key={2}
                                 label={`Needs Review: ${quiz.questions.filter(q => q.needsReview).length}`}/>
                </ProgressBar>
            </div>
            <h3>Description:<br/></h3>
            <p className="description">{quiz.description}</p>
            <h3>Questions:<br/></h3>
        </div>
        : <h1>Quiz Not Found</h1>


    return (
        <Container>
            {QuizHeader}
            {QuestionCards}
        </Container>
    );
}

export default QuizDetails;