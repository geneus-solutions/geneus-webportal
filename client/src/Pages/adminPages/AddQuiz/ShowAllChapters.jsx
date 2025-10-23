import { useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";

import styles from '../../../styles/ShowAllChapters.module.css';

const ShowAllChapters = () => {

    const [search, setSearch] = useState('');
    const [selectedLessonId, setSelectedLessonId] = useState(null);
  
    
    const location = useLocation();
    const navigate = useNavigate();
    console.log("Location State:", location);
    const courseContent = location?.state?.course?.courseContent;
    const courseChapter = location?.state?.chapter;
    
    const filteredLessons = courseContent?.filter((lesson) =>
        lesson?.contentTitle?.toLowerCase().includes(search.toLowerCase())
    );

    const onChapterSelect = (chapter) => {

        navigate(location.pathname, {
            state: {
                ...location.state,
                chapter
            }
        });
    };

        

  return (
    <div>
        <div className={styles.container}>
            <h2>Select a Lesson</h2>
            <p>Select a lesson to make quizzes of it</p>
        <input
            type="text"
            placeholder="Search"
            className={styles.searchInput}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
        />

        <p className={styles.lessonCount}>{filteredLessons?.length} Lessons</p>

        <div className={styles.lessonList}>
            {filteredLessons?.map((lesson, index) => (
                <label key={lesson.id} className={styles.lessonItem} onClick={()=>onChapterSelect(lesson)}>
                    <div className={styles.lessonInfo}>
                        <span className={styles.lessonIndex}>{index + 1}.</span>
                        <span className={styles.lessonTitle}>{lesson.contentTitle}</span>
                        <span className={styles.lessonDuration}>{lesson.time}</span>
                    </div>
                    <input
                        type="radio"
                        name="selectedLesson"
                        checked={courseChapter?.contentTitle === lesson.contentTitle}
                        // onChange={() => setSelectedLessonId(lesson.id)}
                    />
                </label>
            ))}
        </div>
    </div>

    </div>
  );
}

export default ShowAllChapters;