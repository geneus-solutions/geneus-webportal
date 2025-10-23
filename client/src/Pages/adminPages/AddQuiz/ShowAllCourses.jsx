import { useNavigate,useLocation } from "react-router-dom";
import HoverCard from "../../../components/SharedComponents/HoverCard";

import { useCourcesQuery } from "../../../features/cources/courceApiSlice";

const ShowAllCourses = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { data: courses } = useCourcesQuery();

    const activeCourses = courses?.filter(course => course.enabled&&course.courseContent);
    
    const handleClick = (course) => {

        if (course?.courseContent?.length > 0) {
            navigate(location.pathname, {
                state: {
                    ...location.state,
                    course
                }
            });
        } else {
            alert('This course does not have any chapters. Please add chapters before creating a quiz.');
        }
        
    }

    return (

        <div>
            <div>
                <h2 style={{fontSize:'25px'}}>Select A Course</h2>
                <p style={{marginBottom:'30px',fontSize:'12px',color:'#666'}}>
                    Choose a course to add a quiz. 
                    Click on a course card to view its details and proceed with quiz creation.
                </p>
            </div>
            <div
                style={{
                    display: 'flex',
                    flexDirection:'column',
                    maxWidth: '900px',
                    width: '100%',
                    alignItems: 'center',
                    gap:'20px'
                }}
            >
                {activeCourses?.map((course) => (
                    <div key={course._id} style={{width:'100%'}} onClick={()=>handleClick(course)}>
                        <HoverCard
                            title={course.title}
                            description={course.description}
                            image={course.img}
                            level={course.level}
                        />
                    </div>
                ))}
                {courses?.length === 0 && (
                    <p className="no-courses-message">No courses available at the moment.</p>
                )}
            </div>
        </div>
   
    );
}

export default ShowAllCourses;

