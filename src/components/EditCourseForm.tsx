import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Course } from '../interface/courses';

type FormValues = {
  title: string;
  description: string;
};

const EditCourseForm: React.FC<{ course: Course; onSave: (data: FormValues) => void; onCancel: () => void }> = ({ course, onSave, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    defaultValues: {
      title: course.title,
      description: course.description,
    }
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    onSave(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-4 rounded-lg shadow-md mt-4">
      <h2 className="text-xl font-bold mb-4">Edit Course</h2>
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

export default EditCourseForm;
