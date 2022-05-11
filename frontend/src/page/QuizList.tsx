import {Container} from "react-bootstrap";
import {Key, useEffect, useState} from "react";
import React from "react";
import Quiz from "../interface/quiz.interface";
import QuizCard from "../component/QuizCard";

export function QuizList(){

    const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);

    useEffect(() =>{
        fetch('http://localhost:8080/quiz/list')
            .then(res => res.json())
            .then((data) => {
                setQuizzes(data);
            })
    }, []);

    const quizCards = quizzes.map((quiz) => {
        console.log(quiz.title);

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