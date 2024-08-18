import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Course, CoursesState, Module, Lesson } from "../interface/courses";

const initialState: CoursesState = {
  courses: [
    {
      id: 1,
      title: "Curso de ReactJS",
      description: "Aprenda os fundamentos do ReactJS.",
      modules: [
        {
          id: 1,
          title: "Introdução ao React",
          description: "Conceitos básicos e configuração do ambiente.",
          lessons: [
            {
              id: 1,
              title: "O que é React?",
              description: "Uma introdução ao ReactJS.",
              content:
                "React é uma biblioteca JavaScript para construção de interfaces de usuário...",
            },
            {
              id: 2,
              title: "Criando um Projeto React",
              description:
                "Configurando o ambiente e criando um projeto com Create React App.",
              content:
                "Para criar um novo projeto React, utilize o comando npx create-react-app...",
            },
          ],
        },
        {
          id: 2,
          title: "Componentes React",
          description: "Aprenda a criar e utilizar componentes em React.",
          lessons: [
            {
              id: 3,
              title: "Componentes Funcionais",
              description: "Introdução aos componentes funcionais no React.",
              content:
                "Componentes funcionais são uma forma simples de criar componentes em React...",
            },
          ],
        },
      ],
    },
    {
      id: 2,
      title: "Curso de Redux",
      description: "Gerenciamento de estado com Redux.",
      modules: [
        {
          id: 3,
          title: "Fundamentos do Redux",
          description: "Entendendo o fluxo de dados no Redux.",
          lessons: [
            {
              id: 4,
              title: "O que é Redux?",
              description: "Uma introdução ao Redux.",
              content:
                "Redux é uma biblioteca de gerenciamento de estado previsível para aplicações JavaScript...",
            },
          ],
        },
      ],
    },
  ],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse(state, action: PayloadAction<Course>) {
      state.courses.push(action.payload);
    },
    updateCourse(state, action: PayloadAction<Course>) {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id
      );
      if (index !== -1) {
        state.courses[index] = action.payload;
      }
    },
    deleteCourse(state, action: PayloadAction<number>) {
      state.courses = state.courses.filter(
        (course) => course.id !== action.payload
      );
    },
    addModule(
      state,
      action: PayloadAction<{ courseId: number; module: Module }>
    ) {
      const course = state.courses.find(
        (c) => c.id === action.payload.courseId
      );
      if (course) {
        course.modules.push(action.payload.module);
      }
    },
    updateModule(
      state,
      action: PayloadAction<{ courseId: number; module: Module }>
    ) {
      const course = state.courses.find(
        (c) => c.id === action.payload.courseId
      );
      if (course) {
        const index = course.modules.findIndex(
          (m) => m.id === action.payload.module.id
        );
        if (index !== -1) {
          course.modules[index] = action.payload.module;
        }
      }
    },
    deleteModule(
      state,
      action: PayloadAction<{ courseId: number; moduleId: number }>
    ) {
      const course = state.courses.find(
        (c) => c.id === action.payload.courseId
      );
      if (course) {
        course.modules = course.modules.filter(
          (m) => m.id !== action.payload.moduleId
        );
      }
    },
    addLesson(
      state,
      action: PayloadAction<{
        courseId: number;
        moduleId: number;
        lesson: Lesson;
      }>
    ) {
      const course = state.courses.find(
        (c) => c.id === action.payload.courseId
      );
      const module = course?.modules.find(
        (m) => m.id === action.payload.moduleId
      );
      if (module) {
        module.lessons.push(action.payload.lesson);
      }
    },
    updateLesson(
      state,
      action: PayloadAction<{
        courseId: number;
        moduleId: number;
        lesson: Lesson;
      }>
    ) {
      const course = state.courses.find(
        (c) => c.id === action.payload.courseId
      );
      const module = course?.modules.find(
        (m) => m.id === action.payload.moduleId
      );
      if (module) {
        const index = module.lessons.findIndex(
          (l) => l.id === action.payload.lesson.id
        );
        if (index !== -1) {
          module.lessons[index] = action.payload.lesson;
        }
      }
    },
    deleteLesson(
      state,
      action: PayloadAction<{
        courseId: number;
        moduleId: number;
        lessonId: number;
      }>
    ) {
      const course = state.courses.find(
        (c) => c.id === action.payload.courseId
      );
      const module = course?.modules.find(
        (m) => m.id === action.payload.moduleId
      );
      if (module) {
        module.lessons = module.lessons.filter(
          (l) => l.id !== action.payload.lessonId
        );
      }
    },
  },
});

export const {
  addCourse,
  updateCourse,
  deleteCourse,
  addModule,
  updateModule,
  deleteModule,
  addLesson,
  updateLesson,
  deleteLesson,
} = coursesSlice.actions;

export default coursesSlice.reducer;
