import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { updateModule } from '../redux/coursesSlice';
import { AppDispatch } from '../redux/store';
import { Module } from '../interface/courses';

type FormValues = {
  title: string;
  description: string;
};

const EditModuleForm: React.FC<{ courseId: number; module: Module; onCancel: () => void }> = ({ courseId, module, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: module.title,
      description: module.description,
    }
  });
  const dispatch = useDispatch<AppDispatch>();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    const updatedModule = {
      ...module,
      title: data.title,
      description: data.description,
    };
    dispatch(updateModule({ courseId, module: updatedModule }));
    onCancel();
    alert('Module updated successfully');
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Edit Module</h2>
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
      <div className="flex space-x-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-500"
        >
          Save Changes
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditModuleForm;
