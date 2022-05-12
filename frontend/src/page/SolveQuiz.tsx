import User from "../interface/user.interface";
import React, {useEffect, useState} from "react";
import Quiz from "../interface/quiz.interface";
import {useParams} from "react-router-dom";
import FetchService from "../utils/fetchService";
import {Button, Card, ProgressBar, Stack} from "react-bootstrap";
import CardHeader from "react-bootstrap/CardHeader";
import ActiveQuestion from "../component/ActiveQuestion";
import {LinkContainer} from "react-router-bootstrap";

const SolveQuiz = (props: { user: User }) => {
    const [quiz, setQuiz] = useState<Quiz>();
    const [activeQuestion, setActiveQuestion] = useState(0);
    const {quizId} = useParams();
    const [needsReview, setNeedsReview] = useState(0);

    useEffect(() => {
        fetchQuiz().then();
    }, []);

    const authHeader = (props.user === undefined)
        ? ""
        : `Basic ${window.btoa(props.user.name + ':' + props.user.password)}`;

    const fetchQuiz = async () => {
        if (quizId === undefined)
            return undefined;

        const quiz: Quiz | undefined = await FetchService.fetchQuiz(quizId, authHeader);
        setQuiz(quiz);
        setNeedsReview(quiz?.questions.filter(q => q.needsReview).length ?? 0);
    }

    const onNext = () => {
        if (quiz === undefined)
            return;

        setActiveQuestion(activeQuestion + 1);
    }

    const onValidation = (userAnswers: Map<string, boolean>) => {
        if (quiz === undefined)
            return;

        let correct = true;
        [...quiz.questions[activeQuestion].answers.keys()].forEach((k) => {
            if ((quiz.questions[activeQuestion].answers.get(k) !== (userAnswers.get(k) ?? false))) {
                correct = false;
            }
        })

        let newCorrectAnswers = 0;
        let newWrongAnswers = 0;

        if (correct) {
            quiz.questions[activeQuestion].correctAnswers += 1;
            newCorrectAnswers += 1;
        } else {
            quiz.questions[activeQuestion].wrongAnswers += 1;
            newWrongAnswers += 1;
        }

        FetchService.updateQuizStats(quizId as string, quiz.questions[activeQuestion].id as string, newCorrectAnswers, newWrongAnswers, quiz.questions[activeQuestion].needsReview, authHeader)
    }

    const onQuestionStateToggle = (newState: boolean, questionId: string) => {
        if (newState) {
            setNeedsReview(needsReview - 1);
        } else setNeedsReview(needsReview + 1);

        FetchService.updateQuizStats(quizId as string, questionId, 0, 0, newState, authHeader);
    }

    if (quiz === undefined)
        return (<div>fetching quiz</div>)
    return (
        <Card style={{margin: '50px auto', maxWidth: '50rem'}}>
            <CardHeader>
                <Card.Title style={{fontSize: '2.5rem'}}>{quiz?.title}</Card.Title>
                <Card.Subtitle style={{fontSize: '1.5rem', marginBottom: '5px'}}>{`By ${quiz?.author}`}</Card.Subtitle>
                <Stack direction="horizontal" gap={1}>
                    <Card.Text style={{margin: 'auto 0'}}>Quiz progress bar:</Card.Text>
                    <div style={{flex: '1'}}>
                        <ProgressBar>
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
                </Stack>

            </CardHeader>
            {(quiz.questions.length > activeQuestion)
                ? <ActiveQuestion question={quiz.questions[activeQuestion]} onNext={onNext} onValidation={onValidation}
                                  onToggle={onQuestionStateToggle}></ActiveQuestion>
                :
                <Stack gap={1} style={{}}>
                    <Card.Title style={{fontSize: '2.5rem', margin: '5px auto'}}>Quiz Completed</Card.Title>
                    <Button variant={"dark"} onClick={() => setActiveQuestion(0)}>Restart</Button>
                    <LinkContainer to={`/details/${quiz.id}`}>
                        <Button variant="dark">Go to Quiz Details</Button>
                    </LinkContainer>
                </Stack>
            }
        </Card>
    );
}

export default SolveQuiz;