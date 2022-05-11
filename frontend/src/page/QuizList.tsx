import {Container} from "react-bootstrap";
import {Key, useEffect, useState} from "react";
import React from "react";
import Quiz from "../interface/quiz.interface";
import QuizCard from "../component/QuizCard";
import User from "../interface/user.interface";

export function QuizList(props: {user: User | undefined}){

    const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);

    useEffect(() =>{
        let requestOptions = {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "",
            },
        };
        if (props.user)
            requestOptions.headers.Authorization =`Basic ${window.btoa(props.user.name + ':' + props.user.password)}`;
        fetch('http://localhost:8080/quiz/list', requestOptions)
            .then(res => res.json())
            .then((data) => {
                setQuizzes(data);
            })
    }, [props.user]);

    const quizCards = quizzes.map((quiz) => {
        return(
            <QuizCard quiz={quiz} key={quiz.id as Key}/>
        );
    });

    return(
        <Container>
            <div>
                {quizCards}
            </div>
        </Container>
    );
}