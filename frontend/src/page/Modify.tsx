import User from "../interface/user.interface";
import {useNavigate, useParams} from "react-router-dom";
import {QuizForm} from "../component/QuizForm";
import Quiz from "../interface/quiz.interface";
import FetchService from "../utils/fetchService";
import React, {useEffect, useState} from "react";

const Modify = (props: { user: User }) => {
    const [quiz, setQuiz] = useState<Quiz>();
    const {quizId} = useParams();
    const navigate = useNavigate();


    useEffect(() => {
        fetchQuiz().then();
    }, []);

    const authHeater = (props.user === undefined)
        ? ""
        : `Basic ${window.btoa(props.user.name + ':' + props.user.password)}`;

    const save = (quiz: Quiz) => {
        console.log("Modified", quiz)
        FetchService.updateQuiz(quiz, authHeater).finally(() => navigate(-1));
    }

    const fetchQuiz = async () => {
        if (quizId === undefined)
            return undefined;

        const quiz: Quiz | undefined = await FetchService.fetchQuiz(quizId, authHeater);
        console.log(quiz);
        setQuiz(quiz);
    }

    return (
        (quiz !== undefined)
            ? <QuizForm user={props.user} quiz={quiz} onSave={(q) => save(q)}></QuizForm>
            : <h1>Not Found</h1>
    );
}


export default Modify