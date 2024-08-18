import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addCourse } from '../redux/coursesSlice';
import { AppDispatch } from '../redux/store';
import { useNavigate } from 'react-router-dom';

type FormValues = {
  title: string;
  description: string;
};

const AddCoursePage = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newCourse = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      modules: [],  // Initialize without modules
    };
    dispatch(addCourse(newCourse));
    reset();
    navigate(`/courses/${newCourse.id}`);  // Redirect to course details page
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Add New Course</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded-lg shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Course Title</label>
          <input
            {...register('title', { required: 'Title is required' })}
            type="text"
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          />
          {errors.title && <p className="text-red-600">{errors.title.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium">Description</label>
          <textarea
            {...register('description', { required: 'Description is required' })}
            className="w-full mt-2 p-2 border border-gray-300 rounded-md"
          ></textarea>
          {errors.description && <p className="text-red-600">{errors.description.message}</p>}
        </div>
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500"
        >
          Add Course
        </button>
      </form>
    </div>
  );
};

export default AddCoursePage;
