import React, { useEffect, useState } from 'react';
import { useAddCourseMutation, useUpdateCourseMutation } from '../../../features/Course/CourseApiSlice';
import '../../../styles/AddCourse.css';
import { useLocation } from 'react-router-dom';

const AddCourse = () => {
  const [course, setCourse] = useState({
    title: '',
    img: '',
    description: [{ title: '', details: '' }],
    level: '',
    price: '',
    discount_price: '',
    duration: '',
    learnings: [''],
    requirements: [''],
    aboutCourse: { intro: '' },
    whythisCourse: { title: '', intro: '', outro: '' },
    whoitsfor: [''],
  });

  const [addCourse, { isLoading, isError, isSuccess, error }] = useAddCourseMutation();
  const [updateCourse, { isLoading: updateCourseIsLoading }] = useUpdateCourseMutation();

  const location = useLocation();
  const existingData = location?.state?.course;

  useEffect(() => {
    if (existingData) {
      setCourse(existingData);
    }
  }, [existingData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length === 1) {
      setCourse((prev) => ({ ...prev, [name]: value }));
    } else if (keys.length === 2) {
      setCourse((prev) => ({
        ...prev,
        [keys[0]]: { ...prev[keys[0]], [keys[1]]: value },
      }));
    }
  };

  // Handle description field changes
  const handleDescriptionChange = (e, index, field) => {
    const updatedDescription = [...course.description];
    updatedDescription[index][field] = e.target.value;
    setCourse((prev) => ({ ...prev, description: updatedDescription }));
  };

  // Add a new description item
  const addDescriptionItem = () => {
    setCourse((prev) => ({
      ...prev,
      description: [...prev.description, { title: '', details: '' }],
    }));
  };

  // Remove a description item
  const removeDescriptionItem = (index) => {
    setCourse((prev) => ({
      ...prev,
      description: prev.description.filter((_, i) => i !== index),
    }));
  };

  // Handle array field changes
  const handleArrayChange = (e, field, index) => {
    const updatedArray = [...course[field]];
    updatedArray[index] = e.target.value;
    setCourse((prev) => ({ ...prev, [field]: updatedArray }));
  };

  // Add a new item to an array field
  const addArrayItem = (field) => {
    setCourse((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
  };

  // Remove an item from an array field
  const removeArrayItem = (field, index) => {
    setCourse((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if(existingData){
        const response = await updateCourse({courseId: existingData?._id, ...course}).unwrap();
        alert(response.message);
      }else{
      await addCourse(course).unwrap();
      alert('Course added successfully!');
      // console.log(response);
      }
      setCourse({
        title: '',
        img: '',
        description: [{ title: '', details: '' }],
        level: '',
        price: '',
        discount_price: '',
        duration: '',
        learnings: [''],
        requirements: [''],
        aboutCourse: { intro: '' },
        whythisCourse: { title: '', intro: '', outro: '' },
        whoitsfor: [''],
      });
    } catch (err) {
      console.error(err);
      alert('Failed to add course');
    }
  };

  return (
    <div className="course-container">
      <h2 className="form-title">{existingData ?  "Update Course" : "Add a Course"}</h2>
      <form onSubmit={handleSubmit} className="course-form">
        {/* Basic Fields */}
        {['title', 'img', 'level', 'price', 'discount_price', 'duration'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace('_', ' ').toUpperCase()}:</label>
            <input
              type={field.includes('price') ? 'number' : 'text'}
              name={field}
              value={course[field]}
              onChange={handleChange}
              disabled={isLoading}
              required={['title', 'img'].includes(field)}
            />
          </div>
        ))}

        {/* Description Field */}
        <div className="form-group">
          <label>Description:</label>
          {course.description.map((desc, index) => (
            <div key={index} className="description-field">
              <input
                type="text"
                placeholder="Title"
                value={desc.title}
                onChange={(e) => handleDescriptionChange(e, index, 'title')}
                disabled={isLoading}
                required
              />
              <textarea
                placeholder="Details"
                value={desc.details}
                onChange={(e) => handleDescriptionChange(e, index, 'details')}
                disabled={isLoading}
                required
              />
              <button
                type="button"
                onClick={() => removeDescriptionItem(index)}
                disabled={isLoading || course.description.length === 1}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" className='add-button' onClick={addDescriptionItem} disabled={isLoading}>
            Add Description
          </button>
        </div>

        {/* Array Fields */}
        {['learnings', 'requirements', 'whoitsfor'].map((field) => (
          <div className="form-group" key={field}>
            <label>{field.replace(/([A-Z])/g, ' $1').toUpperCase()}:</label>
            {course[field].map((item, index) => (
              <div key={index} className="array-field">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleArrayChange(e, field, index)}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className='remove-button'
                  onClick={() => removeArrayItem(field, index)}
                  disabled={isLoading || course[field].length === 1}
                >
                  Remove
                </button>
              </div>
            ))}
            <button type="button" className='add-button' onClick={() => addArrayItem(field)} disabled={isLoading}>
              Add {field.slice(0, -1)}
            </button>
          </div>
        ))}

        {/* Nested Fields */}
        <div className="form-group">
          <label>About Course:</label>
          <input
            type="text"
            name="aboutCourse.intro"
            value={course.aboutCourse.intro}
            onChange={handleChange}
            placeholder="Intro"
            disabled={isLoading}
          />
        </div>
        <div className="form-group">
          <label>Why This Course:</label>
          {['title', 'intro', 'outro'].map((field) => (
            <input
              key={field}
              type="text"
              name={`whythisCourse.${field}`}
              value={course.whythisCourse[field]}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              disabled={isLoading}
            />
          ))}
        </div>

        {/* Submit Button and Status Messages */}
        <button type="submit" className="submit-button" disabled={isLoading}>
          {/* {isLoading ? 'Adding...' : 'Add Co{eurse'} */}
          {isLoading || updateCourseIsLoading ? (existingData ? "Updating Course..." : "Adding Course...") : (existingData ? "Update Course" : "Add Course")}
        </button>

      
        {isError && <p className="error-message">Failed to add course: {error?.data?.message || 'Unknown error'}</p>}
        {isSuccess && <p className="success-message">Course added successfully!</p>}
      </form>
    </div>
  );
};

export default AddCourse;
