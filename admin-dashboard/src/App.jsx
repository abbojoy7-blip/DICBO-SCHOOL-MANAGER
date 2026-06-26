import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import TeacherPortal from "./pages/roles/TeacherPortal";
import StudentPortal from "./pages/roles/StudentPortal";
import ParentPortal from "./pages/roles/ParentPortal";
import FinancePortal from "./pages/roles/FinancePortal";
import LibrarianPortal from "./pages/roles/LibrarianPortal";
import TransportPortal from "./pages/roles/TransportPortal";
import StudentsList from "./pages/students/StudentsList";
import StudentView from "./pages/students/StudentView";
import StudentForm from "./pages/students/StudentForm";
import Staff from "./pages/Staff";
import Attendance from "./pages/Attendance";
import Fees from "./pages/Fees";
import Exams from "./pages/Exams";
import Timetable from "./pages/Timetable";
import Library from "./pages/Library";
import Inventory from "./pages/Inventory";
import Announcements from "./pages/Announcements";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Classes from "./pages/Classes";
import Parents from "./pages/Parents";
import PreviewReportCard from "./pages/PreviewReportCard";
import PreviewReceipt from "./pages/PreviewReceipt";
import { AuthProvider, useAuth } from "./context/AuthContext";
import RoleProtected from "./components/RoleProtected";

function Protected({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/landing" element={<Landing />} />
          <Route path="/" element={<Landing />} />

          <Route path="/preview/report-card" element={<Protected><PreviewReportCard /></Protected>} />
          <Route path="/preview/receipt" element={<Protected><PreviewReceipt /></Protected>} />

          <Route path="/dashboard" element={<RoleProtected roles={["administrator"]}><Layout /></RoleProtected>}>
            <Route index element={<Dashboard />} />
            <Route path="students" element={<StudentsList />} />
            <Route path="students/new" element={<StudentForm />} />
            <Route path="students/:id" element={<StudentView />} />
            <Route path="students/:id/edit" element={<StudentForm />} />
            <Route path="staff" element={<Staff />} />
            <Route path="parents" element={<Parents />} />
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
            <Route path="transport" element={<TransportPortal />} />
          </Route>

          <Route path="/teacher" element={<RoleProtected roles={["teacher"]}><Layout /></RoleProtected>}>
            <Route index element={<TeacherPortal />} />
            <Route path="attendance" element={<TeacherPortal />} />
            <Route path="students" element={<TeacherPortal />} />
            <Route path="exams" element={<TeacherPortal />} />
            <Route path="homework" element={<TeacherPortal />} />
            <Route path="timetable" element={<TeacherPortal />} />
            <Route path="messages" element={<TeacherPortal />} />
            <Route path="announcements" element={<TeacherPortal />} />
            <Route path="classes" element={<TeacherPortal />} />
          </Route>

          <Route path="/student" element={<RoleProtected roles={["student"]}><Layout /></RoleProtected>}>
            <Route index element={<StudentPortal />} />
            <Route path="timetable" element={<StudentPortal />} />
            <Route path="attendance" element={<StudentPortal />} />
            <Route path="homework" element={<StudentPortal />} />
            <Route path="results" element={<StudentPortal />} />
            <Route path="report-cards" element={<StudentPortal />} />
            <Route path="fees" element={<StudentPortal />} />
            <Route path="messages" element={<StudentPortal />} />
            <Route path="announcements" element={<StudentPortal />} />
            <Route path="profile" element={<StudentPortal />} />
          </Route>

          <Route path="/parent" element={<RoleProtected roles={["parent"]}><Layout /></RoleProtected>}>
            <Route index element={<ParentPortal />} />
            <Route path="children" element={<ParentPortal />} />
            <Route path="attendance" element={<ParentPortal />} />
            <Route path="progress" element={<ParentPortal />} />
            <Route path="report-cards" element={<ParentPortal />} />
            <Route path="fees" element={<ParentPortal />} />
            <Route path="messages" element={<ParentPortal />} />
            <Route path="announcements" element={<ParentPortal />} />
          </Route>

          <Route path="/finance" element={<RoleProtected roles={["finance"]}><Layout /></RoleProtected>}>
            <Route index element={<FinancePortal />} />
            <Route path="payments" element={<FinancePortal />} />
            <Route path="receipts" element={<FinancePortal />} />
            <Route path="balances" element={<FinancePortal />} />
            <Route path="reports" element={<FinancePortal />} />
          </Route>

          <Route path="/librarian" element={<RoleProtected roles={["librarian"]}><Layout /></RoleProtected>}>
            <Route index element={<LibrarianPortal />} />
            <Route path="catalogue" element={<LibrarianPortal />} />
            <Route path="issue" element={<LibrarianPortal />} />
            <Route path="returns" element={<LibrarianPortal />} />
            <Route path="fines" element={<LibrarianPortal />} />
            <Route path="reports" element={<LibrarianPortal />} />
          </Route>

          <Route path="/transport" element={<RoleProtected roles={["transport"]}><Layout /></RoleProtected>}>
            <Route index element={<TransportPortal />} />
            <Route path="vehicles" element={<TransportPortal />} />
            <Route path="routes" element={<TransportPortal />} />
            <Route path="drivers" element={<TransportPortal />} />
            <Route path="assignments" element={<TransportPortal />} />
          </Route>

          <Route path="*" element={<Navigate to="/landing" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}