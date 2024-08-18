import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { updateCourse, deleteCourse, deleteLesson, deleteModule, updateModule, updateLesson } from '../redux/coursesSlice';
import AddLessonForm from '../components/AddLessonForm';
import AddModuleForm from '../components/AddModuleForm';
import EditModuleForm from '../components/EditModuleForm';
import EditLessonForm from '../components/EditLessonForm';
import EditCourseForm from '../components/EditCourseForm';
import { PencilIcon } from '@heroicons/react/16/solid';

const CourseDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const courses = useSelector((state: RootState) => state.courses.courses);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const curso = courses.find((c) => c.id === parseInt(id!));

  const [isEditingCourse, setIsEditingCourse] = useState(false);
  const [editingModuleId, setEditingModuleId] = useState<number | null>(null);
  const [editingLessonId, setEditingLessonId] = useState<number | null>(null);

  if (!curso) {
    return <p>Course not found</p>;
  }

  const handleEditCourseClick = () => {
    setIsEditingCourse(true);
  };

  const handleEditModuleClick = (moduleId: number) => {
    setEditingModuleId(moduleId);
  };

  const handleEditLessonClick = (lessonId: number) => {
    setEditingLessonId(lessonId);
  };

  const handleCourseUpdate = (data: { title: string; description: string }) => {
    const updatedCourse = { ...curso, ...data };
    dispatch(updateCourse(updatedCourse));
    setIsEditingCourse(false);
  };

  const handleModuleUpdate = (updatedModule: { title: string; description: string }) => {
    const module = curso.modules.find((m) => m.id === editingModuleId);
    if (module) {
      const updatedModuleData = { ...module, ...updatedModule };
      dispatch(updateModule({ courseId: curso.id, module: updatedModuleData }));
    }
    setEditingModuleId(null);
  };

  const handleLessonUpdate = (updatedLesson: { title: string; description: string; content: string }) => {
    const module = curso.modules.find((m) => m.lessons.some((l) => l.id === editingLessonId));
    if (module) {
      const lesson = module.lessons.find((l) => l.id === editingLessonId);
      if (lesson) {
        const updatedLessonData = { ...lesson, ...updatedLesson };
        dispatch(updateLesson({ courseId: curso.id, moduleId: module.id, lesson: updatedLessonData }));
      }
    }
    setEditingLessonId(null);
  };

  const handleDeleteCourse = () => {
    dispatch(deleteCourse(curso.id));
    alert('Course deleted successfully');
    navigate('/courses');
  };

  const handleDeleteModule = (moduleId: number) => {
    dispatch(deleteModule({ courseId: curso.id, moduleId }));
    alert('Module deleted successfully');
  };

  const handleDeleteLesson = (moduleId: number, lessonId: number) => {
    dispatch(deleteLesson({ courseId: curso.id, moduleId, lessonId }));
    alert('Lesson deleted successfully');
  };

  return (
    <div className="container mx-auto p-4">
      {isEditingCourse ? (
        <EditCourseForm course={curso} onSave={handleCourseUpdate} onCancel={() => setIsEditingCourse(false)} />
      ) : (
        <>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{curso.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{curso.description}</p>
          <button onClick={handleEditCourseClick} className="bg-yellow-600 text-white px-6 py-2 rounded-md hover:bg-yellow-500 mb-4">
            Edit Course
          </button>
          <button onClick={handleDeleteCourse} className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-500 ml-4">
            Delete Course
          </button>

          <div className="space-y-4 mt-6">
            {curso.modules.map((module) => (
              <div key={module.id} className="bg-white p-4 rounded-lg shadow-md">
                {editingModuleId === module.id ? (
                  <EditModuleForm courseId={curso.id} module={module} onCancel={() => setEditingModuleId(null)} onSave={handleModuleUpdate} />
                ) : (
                  <>
                    <h2 className="text-xl font-semibold text-gray-700">{module.title}</h2>
                    <p className="text-gray-600 mt-2">{module.description}</p>
                    <button onClick={() => handleEditModuleClick(module.id)} className="bg-yellow-600 text-white px-4 py-1 rounded-md hover:bg-yellow-500 mt-2">
                      Edit Module
                    </button>
                    <button onClick={() => handleDeleteModule(module.id)} className="ml-4 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-500 mt-2">
                      Delete Module
                    </button>

                    <div className="mt-4 space-y-2">
                      {module.lessons.map((lesson) => (
                        <div key={lesson.id} className="p-2 bg-gray-50 rounded-md flex justify-between items-center">
                          {editingLessonId === lesson.id ? (
                            <EditLessonForm courseId={curso.id} moduleId={module.id} lesson={lesson} onCancel={() => setEditingLessonId(null)} onSave={handleLessonUpdate} />
                          ) : (
                            <>
                              <div>
                                <h3 className="text-lg font-medium text-gray-800">{lesson.title}</h3>
                                <h2 className="text-gray-600">{lesson.description}</h2>
                                <p className="text-gray-600">{lesson.content}</p>
                              </div>
                              <button onClick={() => handleEditLessonClick(lesson.id)} className="ml-4 bg-yellow-600 text-white px-4 py-1 rounded-md hover:bg-yellow-500">
                                Edit Lesson
                              </button>
                              <button onClick={() => handleDeleteLesson(module.id, lesson.id)} className="ml-4 bg-red-600 text-white px-4 py-1 rounded-md hover:bg-red-500">
                                Delete Lesson
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                    <AddLessonForm courseId={curso.id} moduleId={module.id} />
                  </>
                )}
              </div>
            ))}
            <AddModuleForm courseId={curso.id} />
          </div>
        </>
      )}
    </div>
  );
};

export default CourseDetailPage;
