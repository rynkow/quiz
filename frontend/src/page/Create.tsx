import User from "../interface/user.interface";
import {useNavigate} from "react-router-dom";
import {QuizForm} from "../component/QuizForm";
import Quiz from "../interface/quiz.interface";
import FetchService from "../utils/fetchService";
import React from "react";

const Create = (props: { user: User }) => {
    const navigate = useNavigate();

    const emptyQuizQuiz: Quiz = {
        id: null,
        title: "",
        description: "",
        author: props.user.name,
        isPublic: true,
        questions: []
    }

    const create = (quiz: Quiz) => {
        console.log("Modified", quiz)
        FetchService.createQuiz(quiz, `Basic ${window.btoa(props.user.name + ':' + props.user.password)}`).finally(() => navigate(-1));
    }

    return (
        <QuizForm user={props.user} quiz={emptyQuizQuiz} onSave={(q) => create(q)}></QuizForm>
    );
}

export default Create