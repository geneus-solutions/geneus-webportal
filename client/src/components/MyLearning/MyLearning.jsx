import { useSelector } from "react-redux";
import { useMyLearningQuery } from "../../features/MyLearning/LearningApiSlice";

import CourseCard from "../Courses/CourseCard";

const Mylearning = () => {

    const {user} = useSelector((state) => state.auth);
    
    const { data: courses } = useMyLearningQuery({ user_Id: user?.id }, { skip: !user?.id });
    // console.log(courses);    
    return (
        <div>
            <h4>My Learning</h4>
            <div style={{display:'flex',gap:'10px'}}>
                {courses?.courses?.map(course => (
                    <CourseCard course={course} key={course?._id} />
                ))}
            </div>
        </div>
    );
};

export default Mylearning;