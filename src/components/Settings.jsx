import React from 'react';
import { useApp } from '../context/AppContext';
import { LogOut, Globe, User, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const Settings = ({ onLogout }) => {
  const { t, lang, setLang, user } = useApp();

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-xl font-bold m-0">{t.settingsTitle}</h2>

      {/* User Profile */}
      <div className="glass-card flex items-center gap-4">
        <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl font-black"
          style={{ background: 'rgba(255,185,0,0.15)', color: 'var(--honey-primary)', border: '2px solid rgba(255,185,0,0.3)' }}>
          {user?.username?.[0]?.toUpperCase() || '?'}
        </div>
        <div>
          <p className="text-base font-bold m-0">{user?.username}</p>
          <p className="text-xs m-0" style={{ color: 'rgba(255,249,230,0.4)' }}>
            <User size={10} className="inline mr-1" />
            +91 {user?.phone}
          </p>
        </div>
      </div>

      {/* Language Setting — PRD Section 6.9 */}
      <div className="glass-card">
        <div className="flex items-center gap-3 mb-4">
          <Globe size={18} style={{ color: 'var(--honey-primary)' }} />
          <h3 className="text-sm font-bold m-0">{t.language}</h3>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {[
            { code: 'en', label: '🇮🇳 English', sub: 'English' },
            { code: 'kn', label: '🇮🇳 ಕನ್ನಡ', sub: 'Kannada' }
          ].map(l => (
            <motion.button
              key={l.code}
              whileTap={{ scale: 0.95 }}
              onClick={() => setLang(l.code)}
              className="p-4 rounded-2xl text-left transition-all"
              style={{
                background: lang === l.code ? 'rgba(255,185,0,0.15)' : 'var(--forest-dark)',
                border: `2px solid ${lang === l.code ? 'var(--honey-primary)' : 'rgba(255,255,255,0.06)'}`,
              }}
            >
              <p className="text-base font-bold m-0">{l.label}</p>
              <p className="text-[10px] m-0" style={{ color: 'rgba(255,249,230,0.4)' }}>{l.sub}</p>
              {lang === l.code && (
                <div className="w-2 h-2 rounded-full mt-2" style={{ background: 'var(--honey-primary)' }} />
              )}
            </motion.button>
          ))}
        </div>
      </div>

      {/* App Info */}
      <div className="glass-card">
        <div className="flex items-center gap-3 mb-3">
          <Info size={18} style={{ color: 'rgba(255,249,230,0.4)' }} />
          <h3 className="text-sm font-bold m-0" style={{ color: 'rgba(255,249,230,0.5)' }}>About</h3>
        </div>
        <p className="text-sm font-bold m-0" style={{ color: 'var(--honey-primary)' }}>Jenu-Gumpu</p>
        <p className="text-xs m-0 mt-1" style={{ color: 'rgba(255,249,230,0.4)' }}>AI-Powered Honey Producer Collective</p>
        <p className="text-[10px] mt-2 m-0" style={{ color: 'rgba(255,249,230,0.25)' }}>{t.appVersion}</p>
        <p className="text-[10px] mt-1 m-0" style={{ color: 'rgba(255,249,230,0.2)' }}>Powered by Gemini AI · Room DB Simulation</p>
      </div>

      {/* Log Out */}
      <motion.button
        whileTap={{ scale: 0.97 }}
        onClick={onLogout}
        className="w-full p-4 rounded-2xl flex items-center justify-center gap-2 font-bold text-sm transition-colors"
        style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#EF4444' }}
      >
        <LogOut size={18} />
        {t.logOut}
      </motion.button>
    </div>
  );
};

export default Settings;
