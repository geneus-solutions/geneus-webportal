import React, { useState } from 'react';

import { useLocation } from 'react-router-dom';

import styles from '../../../styles/AddQuiz.module.css';
import QuizQuestionList from '../../../components/quizComponents/quizQuestionList';

import { useSaveQuizMutation } from '../../../features/quiz/quizApiSlice';

const AddQuiz = () => {

  const location = useLocation();
  const course = location.state?.course || {};
  const chapter = location.state?.chapter || {};

  const [save, setSave] = useState(false);

  const [basicInfo, setBasicInfo] = useState({
    name: '',
    description: ''
  });

  const [questions, setQuestions] = useState([
    {
      questionText: '',
      options: ['', '', '', ''],
      correctAnswerIndex: 0,
      correctAnswerDescription: ''
    }
  ]);

  const [saveQuiz] = useSaveQuizMutation();

  const handleBasicInfoChange = (e) => {

    const { name, value } = e.target;
    setBasicInfo((prev) => ({ ...prev, [name]: value }));

  }

  const handleBasicInfoSave = () => {
    if (!basicInfo.name || !basicInfo.description) {
      alert('Please fill in all fields');
      return;
    }

      setSave(true);
  }

  const handleQuestionChange = (index, field, value) => {
    const updated = [...questions];
    updated[index][field] = value;
    setQuestions(updated);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const updated = [...questions];
    updated[qIndex].options[optIndex] = value;
    setQuestions(updated);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        questionText: '',
        options: ['', '', '', ''],
        correctAnswerIndex: 0,
        correctAnswerDescription: ''
      }
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      courseId:course?._id,
      title: chapter?.contentTitle,
      ...basicInfo,
      questions
    };

    try {

      const response = await saveQuiz(payload).unwrap();
      
      if(response?.success) {
        alert('Quiz created successfully!');
        setBasicInfo({ name: '', description: '' });
        setQuestions([
          {
            questionText: '',
            options: ['', '', '', ''],
            correctAnswerIndex: 0,
            correctAnswerDescription: ''
          }
        ]);
      }

    } catch (error) {
      alert('Failed to create quiz. Please try again.');
      console.error('Error:', error);
    }
  };

  return (
    <div className={styles.container}>

      <div style={{display:'flex',flexDirection:'column',flex:1}}>
        <h2>Add Quiz</h2>
        <p className={styles.subtitle} style={{marginBottom:'15px'}}>
          Create a quiz for your course or chapter to test students' knowledge and understanding.
        </p>

        <div className={styles.container} style={{display:'flex',columnGap:'20px',flexWrap:'wrap'}}>
          {course?._id && (
            <div>
              <p style={{margin:0,fontWeight:'bold'}}>Course Name</p>
              <p className={styles.subtitle} style={{fontSize:'12px'}}>
                {course?.title || 'No course selected'}
              </p>
            </div>
          )}
          {chapter?.contentTitle && (
            <div>
              <p style={{margin:0,fontWeight:'bold'}}>Chapter Name</p>
              <p className={styles.subtitle} style={{fontSize:'12px'}}>
                {chapter?.contentTitle || 'No course selected'}
              </p>
            </div>
          )}
          {basicInfo?.name && (
            <div>
              <p style={{margin:0,fontWeight:'bold'}}>Quiz Name</p>
              <p className={styles.subtitle} style={{fontSize:'12px'}}>
                {basicInfo?.name || 'No course selected'}
              </p>
            </div>
          )}

          {basicInfo?.description && (
            <div>
              <p style={{margin:0,fontWeight:'bold'}}>Quiz Description</p>
              <p className={styles.subtitle} style={{fontSize:'12px'}}>
                {basicInfo?.description || 'No course selected'}
              </p>
            </div>
          )}

        </div>
        
        {!save&&<div>
          <h5 style={{margin:0}}>Add Basic Information</h5>
          <p className={styles.subtitle} style={{margin:0,marginBottom:'10px',fontSize:'12px'}}>
            Give your quiz a name and description so it gives clearifications to the students
          </p>
        </div>}

        {!save&&<div className={styles.form} style={{marginBottom:'20px'}}>
          <label className={styles.label}>
            Quiz Name <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            placeholder="e.g. Sample quiz"
            name="name"
            value={basicInfo.name}
            onChange={handleBasicInfoChange}
            required
          />

          <label className={styles.label}>
            Description <span title="Write a helpful explanation for your quiz." className={styles.required} >*</span>
          </label>
          <textarea
            className={styles.textareaRich}
            placeholder="Describe your quiz..."
            name="description"
            value={basicInfo.description}
            onChange={handleBasicInfoChange}
            required
          />
          <button 
            type="button" 
            onClick={handleBasicInfoSave}
            style={{width:'100px',padding:'10px',backgroundColor:'#4CAF50',color:'white',border:'none',borderRadius:'5px'}}
          >
            Save
          </button>
        </div>}

        {(save&&basicInfo?.name&&basicInfo?.description)&&<form onSubmit={handleSubmit} className={styles.form} style={{marginBottom:'20px'}}>

          {questions.map((q, qIndex) => (
            <div key={qIndex} className={styles.questionBox}>
              <label className={styles.label}>
                Question {qIndex + 1}
              </label>
              <input
                type="text"
                placeholder="Enter question"
                value={q.questionText}
                onChange={(e) => handleQuestionChange(qIndex, 'questionText', e.target.value)}
                required
              />

              <div className={styles.options}>
                {q.options.map((opt, optIndex) => (
                  <input
                    key={optIndex}
                    type="text"
                    placeholder={`Option ${optIndex + 1}`}
                    value={opt}
                    onChange={(e) => handleOptionChange(qIndex, optIndex, e.target.value)}
                    required
                  />
                ))}
              </div>

              <label className={styles.label}>Correct Answer</label>
              <select
                value={q.correctAnswerIndex}
                onChange={(e) => handleQuestionChange(qIndex, 'correctAnswerIndex', Number(e.target.value))}
                required
              >
                <option value={0}>Option 1</option>
                <option value={1}>Option 2</option>
                <option value={2}>Option 3</option>
                <option value={3}>Option 4</option>
              </select>

              <label className={styles.label}>Answer Explanation</label>
              <textarea
                placeholder="Explain why this is the correct answer"
                value={q.correctAnswerDescription}
                onChange={(e) => handleQuestionChange(qIndex, 'correctAnswerDescription', e.target.value)}
                required
              />
            </div>
          ))}

          <button type="button" onClick={addQuestion}>+ Add Question</button>
          <button 
            type="submit" 
            style={{width:'auto',padding:'10px 12px',backgroundColor:'#4CAF50',color:'white',border:'none',borderRadius:'5px',marginLeft:'10px'}}
          >
            Submit Quiz
          </button>
        </form>}
      </div>

      <div
        className={styles.questionListContainer}
        style={{width:'450px', padding: '1rem',maxHeight: 'calc(100vh - 150px)', overflowY: 'auto'}}
      >
        <QuizQuestionList
          questions={questions}
        />
      </div>
    </div>

  );
};

export default AddQuiz;
