import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { addModule } from '../redux/coursesSlice';
import { AppDispatch } from '../redux/store';

type FormValues = {
  title: string;
  description: string;
};

const AddModuleForm: React.FC<{ courseId: number }> = ({ courseId }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>();
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const newModule = {
      id: Date.now(),
      title: data.title,
      description: data.description,
      lessons: [],
    };
    dispatch(addModule({ courseId, module: newModule }));
    reset();
    alert('Module added successfully');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Add New Module</h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium">Module Title</label>
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
        Add Module
      </button>
    </form>
  );
};

export default AddModuleForm;
