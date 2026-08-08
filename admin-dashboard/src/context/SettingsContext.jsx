import { createContext, useContext, useState, useEffect } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

const SettingsContext = createContext();

export function SettingsProvider({ children }) {
  const { user } = useAuth();
  const [settings, setSettings] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSettings = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await api.get("/settings");
      setSettings(res.data.settings);

      // Apply institutional branding from database or use DIT defaults
      const primary = res.data.settings?.primaryColor || '#0B1F3A';
      const accent = res.data.settings?.academicGold || '#C9A227';

      document.documentElement.style.setProperty('--primary-navy', primary);
      document.documentElement.style.setProperty('--academic-gold', accent);

    } catch (err) {
      console.error("Failed to fetch settings", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [user]);

  return (
    <SettingsContext.Provider value={{ settings, loading, refreshSettings: fetchSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export const useSettings = () => useContext(SettingsContext);
