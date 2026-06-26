import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import StudentProfile from "./pages/StudentProfile";
import Staff from "./pages/Staff";
import Classes from "./pages/Classes";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Exams from "./pages/Exams";
import Timetable from "./pages/Timetable";
import Library from "./pages/Library";
import Inventory from "./pages/Inventory";
import Announcements from "./pages/Announcements";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";

const Router = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<App />}> 
        <Route index element={<Dashboard />} />
        <Route path="students" element={<Students />} />
        <Route path="students/:id" element={<StudentProfile />} />
        <Route path="staff" element={<Staff />} />
        <Route path="classes" element={<Classes />} />
        <Route path="attendance" element={<Attendance />} />
        <Route path="fees" element={<Fees />} />
        <Route path="exams" element={<Exams />} />
        <Route path="timetable" element={<Timetable />} />
        <Route path="library" element={<Library />} />
        <Route path="inventory" element={<Inventory />} />
        <Route path="announcements" element={<Announcements />} />
        <Route path="messages" element={<Messages />} />
        <Route path="settings" element={<Settings />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  </BrowserRouter>
);

export default Router;
