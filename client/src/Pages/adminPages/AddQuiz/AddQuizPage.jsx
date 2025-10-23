import { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import ShowAllCourses from "./ShowAllCourses";
import ShowAllChapters from "./ShowAllChapters";

import ProgressStepper from "../../../components/SharedComponents/ProgressStepper";
import AddQuiz from "./AddQuiz";

const AddQuizPage = () => {


    const location = useLocation();
    const locationState = location.state;
    const [currentSteps, setCurrentSteps] = useState(0); // State to manage current step

    const pages = [
       {
            id: 0,
            page:<ShowAllCourses />
       },
       {
            id: 1,
            page:<ShowAllChapters />
       },
       {
            id:2,
            page:<AddQuiz />
       }
    ]

    useEffect(() => {
        if (locationState && locationState?.course?._id !== undefined) {
            console.log("Course selected:", locationState.course);
            setCurrentSteps(1); // Set to 1 if a course is selected
        }
        if (locationState && locationState?.chapter !== undefined) {
            console.log("Chapter selected:", locationState.chapter);
            setCurrentSteps(2); // Set to 2 if a chapter is selected
        }
    }, [locationState]);

    const steps = ["SELECT COURSE", "SELECT CHAPTER", "ADD QUIZ"];

    return (
        <div>
            
            <div style={{padding:'1rem'}}>
                <ProgressStepper
                    steps={steps}
                    currentStep={currentSteps} // Adjust this based on the current step
                /> 
            </div>
            <div style={{margin:'0 40px'}}>
                {
                    pages.map((page, index) => (
                        <div key={index} style={{ display: currentSteps === page.id ? 'block' : 'none' }}>
                            {page.page}
                        </div>
                    ))
                }
            </div>

        </div>
    );
}

export default AddQuizPage;