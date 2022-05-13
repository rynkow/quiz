import {Button, Container, Stack} from "react-bootstrap";
import React, {Key, useEffect, useState} from "react";
import Quiz from "../interface/quiz.interface";
import QuizCard from "../component/QuizCard";
import User from "../interface/user.interface";
import {LinkContainer} from "react-router-bootstrap";

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
        fetch('http://localhost:8080/quiz', requestOptions)
            .then(res => res.json())
            .then((data) => {
                setQuizzes(data);
            })
    }, [props.user]);

    const deleteQuiz = (id: string)=>{
        if (props.user === undefined)
            return

        let requestOptions = {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Basic ${window.btoa(props.user.name + ':' + props.user.password)}`,
            },
        };

        fetch(`http://localhost:8080/quiz/${id}`, requestOptions)
            .then(
                res => {
                    console.log(`${id} deletion status`, res.status);
                    if (res.ok){
                        setQuizzes(quizzes.filter(q=>q.id!==id));
                    }
                }
            )
    }

    const quizCards = quizzes.map((quiz) => {
        return(
            <QuizCard quiz={quiz} key={quiz.id as Key}>
                <Stack direction="horizontal" gap={1}>
                    <LinkContainer to={`/details/${quiz.id}`}>
                        <Button variant="dark">Details</Button>
                    </LinkContainer>
                    <LinkContainer to={`/solve/${quiz.id}`}>
                        <Button variant="dark">Solve</Button>
                    </LinkContainer>
                    <LinkContainer to={`/edit/${quiz.id}`} >
                        <Button variant="dark" hidden={(props.user === undefined) || props.user.name !== quiz.author}>Edit</Button>
                    </LinkContainer>
                    <Button
                        className="ms-auto"
                        variant="danger"
                        onClick={()=>deleteQuiz(quiz.id as string)}
                        hidden={(props.user === undefined) || props.user.name !== quiz.author}
                    >
                        Delete
                    </Button>
                </Stack>
            </QuizCard>
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