export interface Lesson {
    id: number;
    title: string;
    description: string;
    content: string;
  }
  
  export interface Module {
    id: number;
    title: string;
    description: string;
    lessons: Lesson[];
  }
  
  export interface Course {
    id: number;
    title: string;
    description: string;
    modules: Module[];
  }
  
  export interface CoursesState {
    courses: Course[];
  }
  