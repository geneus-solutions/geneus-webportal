import React from "react";
import AccordionItem from "../SharedComponents/AccordionItem";

const QuizQuestionList = ({questions=[]}) => {
  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>
        {questions.map((item, index) => (
            <>
                {item?.questionText&&<AccordionItem 
                    key={index} 
                    title={item.questionText} 
                    content={
                        <div>
                            <p>Options:</p>
                            <ul>
                                {item.options.map((option, optIndex) => (
                                    <li key={optIndex}>{option ? option : 'option not provided'}</li>
                                ))}
                            </ul>
                            <p>Correct Answer: {item.options[item.correctAnswerIndex]?item.options[item.correctAnswerIndex]:"correct answer not choosed"}</p>
                            <p>Explanation: {item.correctAnswerDescription ? item.correctAnswerDescription : 'No description provided' }</p>
                        </div>
                    }
                />}
            </>
        ))}
    </div>
  );
};

export default QuizQuestionList;
