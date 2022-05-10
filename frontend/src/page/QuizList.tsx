import {Container} from "react-bootstrap";
import {Key, useEffect, useState} from "react";
import React from "react";
import Quiz from "../interface/quiz.interface";

export function QuizList(){

    const [quizzes, setQuizzes] = useState<Array<Quiz>>([]);

    useEffect(() =>{
        fetch('http://localhost:8080/quiz/list')
            .then(res => res.json())
            .then((data) => {
                setQuizzes(data);
            })
    }, []);

    const names = quizzes.map((quiz) => {
        console.log(quiz.title);

        return(
            <div key={quiz.id as Key} ><p>{quiz.title}</p></div>
        );
    });

    return(
        <Container>
            <div>
                {names}
            </div>
        </Container>
    );
}