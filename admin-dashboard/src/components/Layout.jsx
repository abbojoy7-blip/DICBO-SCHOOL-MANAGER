import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import Toast from "./ui/Toast";
import ConfirmDialog from "./ui/ConfirmDialog";
import Footer from "./Footer";
import "../App.css";
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from 'react';
import PageLoader from './ui/PageLoader';

export default function Layout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [toast, setToast] = useState({visible:false,message:'',type:'info'});
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 220);
    const t = window.setTimeout(() => setToast({visible:false,message:'',type:'info'}), 2200);
    return ()=> { window.clearTimeout(timer); window.clearTimeout(t); };
  }, [toast.visible]);

  const handleLogout = () => {
    setConfirmOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setConfirmOpen(false);
    setToast({visible:true,message:'Signed out successfully', type:'success'});
    navigate('/login');
  };

  return (
    <div className="app-container">
      <Sidebar onLogout={handleLogout} />
      <div className="main">
        <div style={{ padding: '8px 16px 0', display: 'flex', justifyContent: 'flex-start' }}>
          <div className="demo-pill" style={{ background: '#eff6ff', color: '#2563eb', border: '1px solid #bfdbfe' }}>Demo Mode — Sample data only</div>
        </div>
        <Topbar />
        <div className="content" style={{ opacity: ready ? 1 : 0.95 }}>
          {!ready ? <PageLoader /> : (
            <>
              <Outlet context={{ showToast: (message, type='info') => setToast({visible:true, message, type}) }} />
              <Footer />
            </>
          )}
        </div>
      </div>
      <Toast message={toast.message} type={toast.type} visible={toast.visible} />
      <ConfirmDialog open={confirmOpen} title="Sign out" message="Are you sure you want to sign out?" onConfirm={confirmLogout} onCancel={() => setConfirmOpen(false)} />
    </div>
  );
}
