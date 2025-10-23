import {useEffect} from "react";
import { useNavigate,useLocation } from "react-router-dom";

import "../../styles/My_LearningCourseContent.css";


const MyLearningCourseContent = ({data}) => {

  const navigate = useNavigate();
  const location = useLocation();
  const currentContent = location?.state?.content;
  const courseId = location?.state?.courseId;
  // console.log('this is data', data);
  useEffect(() => {
    if(!currentContent && data?.courseContent?.length>=0){
      navigate('/my-learning/', { state: {courseId,content:data?.courseContent[0] } });
    }
  }, [courseId,currentContent,data,navigate]);

  const handleCurrentVideo = (content) => {
    navigate('/my-learning/', { state: { courseId,content } });
  }
  

  return (
    <div className='course-content-learning'>
      <h3>Course Content</h3>
      <ul>
        {
          data?.courseContent?.slice(0, -1)?.map((content,index) => {
            return (
              <li key={index+1} onClick={()=>handleCurrentVideo(content)}>
                <div>
                  <p>
                    <strong>{index+1} : </strong> 
                    <span className={currentContent?.contentTitle === content?.contentTitle&&"active"}>
                      {content?.contentTitle}
                    </span>
                  </p>
                  <p>
                    {content?.time}
                  </p>
                </div>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default MyLearningCourseContent;
