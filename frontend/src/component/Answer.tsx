import React from "react";

const Answer = (props:{answer: string, isTrue: boolean}) =>{
    console.log("rendering Answer");

    return(
      <div>{`${props.answer}: ${props.isTrue}`}</div>
    );
}

export default Answer;