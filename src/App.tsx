import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CoursesPage from "./pages/CoursesPage";
import CourseDetailPage from "./pages/CourseDetailPage";
import AddCoursePage from "./pages/AddCoursePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <div className="container mx-auto sm:px-6 lg:px-8 pt-8">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:id" element={<CourseDetailPage />} />
        <Route path="/add-course" element={<AddCoursePage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      </div>
  );
}

export default App;
