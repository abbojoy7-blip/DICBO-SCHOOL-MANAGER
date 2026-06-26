import { createContext, useContext, useState, useEffect } from "react";
import { getStorage, setStorage } from "../utils/storage";

const AuthContext = createContext();

const DEMO_PW = 'demo1234';

const demoUsers = [
  { id: 'u-admin', email: 'admin@demo.com', name: 'Platform Admin', role: 'administrator' },
  { id: 'u-teacher', email: 'teacher@demo.com', name: 'Alice Muwonge', role: 'teacher' },
  { id: 'u-student', email: 'student@demo.com', name: 'John Doe', role: 'student', studentId: 's1' },
  { id: 'u-parent', email: 'parent@demo.com', name: 'Martha Parent', role: 'parent', children: ['s1'] },
  { id: 'u-finance', email: 'finance@demo.com', name: 'Miriam Kakande', role: 'finance' },
  { id: 'u-librarian', email: 'librarian@demo.com', name: 'Libby Keeper', role: 'librarian' },
  { id: 'u-transport', email: 'transport@demo.com', name: 'Tom Driver', role: 'transport' }
];

function seedDemoUsers(){
  try{
    if(!localStorage.getItem('demo_users')){
      localStorage.setItem('demo_users', JSON.stringify(demoUsers.map(u=>({ ...u, password: DEMO_PW }))));
    }
  }catch(e){}
}

export function AuthProvider({ children }){
  const [user, setUser] = useState(getStorage('user'));

  useEffect(()=>{
    seedDemoUsers();
    setStorage('user', user);
  }, [user]);

  const login = async (email, password) => {
    seedDemoUsers();
    const all = JSON.parse(localStorage.getItem('demo_users')||'[]');
    const found = all.find(u => u.email.toLowerCase() === (email||'').toLowerCase() && u.password === password);
    if(found){
      // don't store password on context
      const safe = { id: found.id, email: found.email, name: found.name, role: found.role };
      if(found.children) safe.children = found.children;
      if(found.studentId) safe.studentId = found.studentId;
      setUser(safe);
      return safe;
    }
    // fallback: accept any email with demo pw
    if(password === DEMO_PW){
      const anon = { id: `u-${Date.now()}`, email, name: email.split('@')[0], role: 'teacher' };
      setUser(anon);
      return anon;
    }
    throw new Error('Invalid demo credentials');
  }

  const logout = () => { setUser(null); };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);
