import { v4 as uuid } from 'uuid';

const students = [
  { id: 's1', firstName: 'John', lastName: 'Doe', name: 'John Doe', admissionNumber: 'ADM001', class: 'P5', gender:'male', feeStatus: 'Paid' },
  { id: 's2', firstName: 'Sarah', lastName: 'Namukasa', name: 'Sarah Namukasa', admissionNumber: 'ADM002', class: 'P6', gender:'female', feeStatus: 'Pending' },
  { id: 's3', firstName: 'Brian', lastName: 'Okello', name: 'Brian Okello', admissionNumber: 'ADM003', class: 'P7', gender:'male', feeStatus: 'Paid' },
];

const fees = [
  { id: 'f1', student: 'John Doe', amount: 200000, status: 'Paid', date: '2026-06-01' },
  { id: 'f2', student: 'Sarah Namukasa', amount: 200000, status: 'Unpaid', date: '2026-06-02' },
];

const reports = { totalStudents: students.length, paidFees: fees.filter(f=>f.status==='Paid').length, pendingFees: fees.filter(f=>f.status!=='Paid').length };

export function seed() {
  if(!localStorage.getItem('students')){
    localStorage.setItem('students', JSON.stringify(students));
  }
  if(!localStorage.getItem('fees')){
    localStorage.setItem('fees', JSON.stringify(fees));
  }
  if(!localStorage.getItem('reports')){
    localStorage.setItem('reports', JSON.stringify(reports));
  }
}

export default { students, fees, reports };
