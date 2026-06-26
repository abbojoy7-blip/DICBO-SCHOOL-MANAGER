export const demoData = {
  staff: [
    { id: 1, name: 'Alice Muwonge', role: 'Principal', email: 'alice@dicbo.edu', phone: '+256778000111', status: 'Active' },
    { id: 2, name: 'Daniel Ssekandi', role: 'Head of Academics', email: 'daniel@dicbo.edu', phone: '+256778000112', status: 'Active' },
    { id: 3, name: 'Miriam Kakande', role: 'Bursar', email: 'miriam@dicbo.edu', phone: '+256778000113', status: 'On Leave' }
  ],
  classes: [
    { id: 1, name: 'P5 Blue', stream: 'Science', teacher: 'Alice Muwonge', capacity: 38 },
    { id: 2, name: 'P6 Green', stream: 'Arts', teacher: 'Daniel Ssekandi', capacity: 34 },
    { id: 3, name: 'S1 Yellow', stream: 'Computer', teacher: 'Miriam Kakande', capacity: 40 }
  ],
  attendance: [
    { id: 1, student: 'John Doe', class: 'P5 Blue', status: 'Present' },
    { id: 2, student: 'Sarah Namukasa', class: 'P6 Green', status: 'Late' },
    { id: 3, student: 'Brian Okello', class: 'P7 Red', status: 'Absent' }
  ],
  fees: [
    { id: 1, student: 'John Doe', amount: 200000, status: 'Paid', date: '2026-06-01', receipt: 'RCPT-1001' },
    { id: 2, student: 'Sarah Namukasa', amount: 200000, status: 'Partial', date: '2026-06-02', receipt: 'RCPT-1002' },
    { id: 3, student: 'Brian Okello', amount: 180000, status: 'Unpaid', date: '2026-06-03', receipt: 'RCPT-1003' }
  ],
  exams: [
    { id: 1, student: 'John Doe', subject: 'Math', score: 88, grade: 'A' },
    { id: 2, student: 'Sarah Namukasa', subject: 'English', score: 76, grade: 'B' },
    { id: 3, student: 'Brian Okello', subject: 'Science', score: 92, grade: 'A' }
  ],
  timetable: [
    { day: 'Monday', slot: '08:00', subject: 'Math', teacher: 'Daniel Ssekandi' },
    { day: 'Monday', slot: '09:00', subject: 'Science', teacher: 'Alice Muwonge' },
    { day: 'Tuesday', slot: '08:00', subject: 'English', teacher: 'Miriam Kakande' }
  ],
  library: [
    { id: 1, title: 'Introduction to Algebra', author: 'M. Kato', available: true },
    { id: 2, title: 'World History', author: 'R. Nsubuga', available: false }
  ],
  inventory: [
    { id: 1, item: 'Projector', quantity: 4, status: 'In stock' },
    { id: 2, item: 'Whiteboards', quantity: 2, status: 'Low stock' }
  ],
  announcements: [
    { id: 1, title: 'School reopening', body: 'The school reopens on 15th July.', type: 'info' },
    { id: 2, title: 'Fee reminder', body: 'Term 3 fees are due on 30th June.', type: 'warning' }
  ],
  messages: [
    { id: 1, from: 'Parent', subject: 'Student transport concerns', unread: true },
    { id: 2, from: 'Office', subject: 'Meeting schedule', unread: false }
  ],
  settings: { schoolName: 'DICBO School', currency: 'UGX', timezone: 'EAT' }
};

export function syncDemoData() {
  const keys = ['staff','classes','attendance','fees','exams','timetable','library','inventory','announcements','messages','settings'];
  for (const key of keys) {
    if (!localStorage.getItem(key)) localStorage.setItem(key, JSON.stringify(demoData[key]));
  }
}
