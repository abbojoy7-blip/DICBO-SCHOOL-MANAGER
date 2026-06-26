import { useMemo } from 'react';
import RolePortalDashboard from '../../components/RolePortalDashboard';
import DemoPage from '../../components/DemoPage';

const teacherClasses = [
  { id: 'tc1', name: 'P5 Blue', subject: 'Mathematics', students: 38, status: 'Active' },
  { id: 'tc2', name: 'P6 Green', subject: 'English', students: 34, status: 'Active' }
];

const attendanceSeed = [
  { id: 'ta1', student: 'John Doe', class: 'P5 Blue', status: 'Present', date: '2026-06-26' },
  { id: 'ta2', student: 'Sarah Namukasa', class: 'P5 Blue', status: 'Late', date: '2026-06-26' },
  { id: 'ta3', student: 'Brian Okello', class: 'P6 Green', status: 'Absent', date: '2026-06-25' }
];

const marksSeed = [
  { id: 'm1', student: 'John Doe', subject: 'Mathematics', score: '88', grade: 'A', status: 'Published' },
  { id: 'm2', student: 'Sarah Namukasa', subject: 'English', score: '76', grade: 'B', status: 'Draft' }
];

const homeworkSeed = [
  { id: 'h1', title: 'Algebra Practice', class: 'P5 Blue', due: '2026-06-30', status: 'Assigned' },
  { id: 'h2', title: 'Essay Draft', class: 'P6 Green', due: '2026-07-02', status: 'Pending' }
];

const timetableSeed = [
  { id: 'tt1', day: 'Monday', slot: '08:00', subject: 'Mathematics', class: 'P5 Blue' },
  { id: 'tt2', day: 'Wednesday', slot: '10:00', subject: 'English', class: 'P6 Green' }
];

const messagesSeed = [
  { id: 'msg1', from: 'Head Teacher', subject: 'Staff Meeting', status: 'Unread' },
  { id: 'msg2', from: 'Student Parent', subject: 'Homework clarification', status: 'Read' }
];

const announcementsSeed = [
  { id: 'an1', title: 'Mid-term review', body: 'Please update marks before Friday', type: 'info' },
  { id: 'an2', title: 'Sports day', body: 'Assembly at 8:00 AM', type: 'success' }
];

export default function TeacherPortal(){
  const stats = useMemo(() => [
    { label: 'Active classes', value: '2', delta: '+1 this week' },
    { label: 'Attendance rate', value: '94%', delta: 'Above target' },
    { label: 'Marks entered', value: '42', delta: '12 pending' },
    { label: 'Homework due', value: '3', delta: '2 urgent' }
  ], []);

  const chartData = useMemo(() => [
    { name: 'Mon', value: 92 }, { name: 'Tue', value: 95 }, { name: 'Wed', value: 90 }, { name: 'Thu', value: 97 }, { name: 'Fri', value: 96 }
  ], []);

  const recent = useMemo(() => [
    { title: 'Attendance submitted', detail: 'P5 Blue marked present for 38 learners', date: 'Today' },
    { title: 'Homework reminder', detail: 'Essay draft due tomorrow', date: 'Today' }
  ], []);

  return (
    <div>
      <RolePortalDashboard title="Teacher Portal" subtitle="Manage lessons, attendance, assessments, and communication in one polished teaching workspace." badge="● Teacher workspace • Demo mode" stats={stats} chartData={chartData} recent={recent} />
      <div className="page-shell">
        <div className="dashboard-grid">
          <DemoPage title="My Classes" description="Your active classes and teaching load" storageKey="teacher-classes" seedData={teacherClasses} columns={[{key:'name',label:'Class'}, {key:'subject',label:'Subject'}, {key:'students',label:'Students'}, {key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Take Attendance" description="Mark daily lessons and attendance" storageKey="teacher-attendance" seedData={attendanceSeed} columns={[{key:'student',label:'Student'}, {key:'class',label:'Class'}, {key:'status',label:'Status'}, {key:'date',label:'Date'}]} actions={['edit']} />
          <DemoPage title="Enter Marks" description="Update assessments and publish grades" storageKey="teacher-marks" seedData={marksSeed} columns={[{key:'student',label:'Student'}, {key:'subject',label:'Subject'}, {key:'score',label:'Score'}, {key:'grade',label:'Grade'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Homework Management" description="Issue and monitor assignments" storageKey="teacher-homework" seedData={homeworkSeed} columns={[{key:'title',label:'Title'}, {key:'class',label:'Class'}, {key:'due',label:'Due'}, {key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Timetable" description="View your weekly teaching schedule" storageKey="teacher-timetable" seedData={timetableSeed} columns={[{key:'day',label:'Day'}, {key:'slot',label:'Slot'}, {key:'subject',label:'Subject'}, {key:'class',label:'Class'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Student Profiles" description="Keep your learner records close at hand" storageKey="teacher-students" seedData={[{id:'ts1',name:'John Doe',class:'P5 Blue',phone:'+256778000111',status:'Active'}]} columns={[{key:'name',label:'Name'}, {key:'class',label:'Class'}, {key:'phone',label:'Phone'}, {key:'status',label:'Status'}]} actions={['edit']} />
          <DemoPage title="Messages" description="Respond to parent and admin communications" storageKey="teacher-messages" seedData={messagesSeed} columns={[{key:'from',label:'From'}, {key:'subject',label:'Subject'}, {key:'status',label:'Status'}]} actions={['edit']} />
        </div>
        <div className="dashboard-grid">
          <DemoPage title="Announcements" description="Share school updates with learners and parents" storageKey="teacher-announcements" seedData={announcementsSeed} columns={[{key:'title',label:'Title'}, {key:'body',label:'Body'}, {key:'type',label:'Type'}]} actions={['edit']} />
        </div>
      </div>
    </div>
  );
}
