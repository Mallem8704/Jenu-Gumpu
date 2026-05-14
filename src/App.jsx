import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import HarvestLog from './components/HarvestLog';
import GradingTool from './components/GradingTool';
import StockScreen from './components/StockScreen';
import ProfitScreen from './components/ProfitScreen';
import Analytics from './components/Analytics';
import Settings from './components/Settings';
import { motion, AnimatePresence } from 'framer-motion';
import './index.css';

// PRD Screen: Splash Screen — Branding
const SplashScreen = ({ onDone }) => {
  useEffect(() => {
    const t = setTimeout(onDone, 2200);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-[100]"
      style={{ background: 'var(--forest-dark)' }}>
      <motion.div
        initial={{ scale: 0.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
        className="text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }}
          className="text-7xl mb-4"
        >🍯</motion.div>
        <h1 className="text-4xl font-black m-0" style={{ color: 'var(--honey-primary)' }}>ಜೇನು-ಗುಂಪು</h1>
        <p className="text-sm mt-2 m-0 font-medium" style={{ color: 'rgba(255,249,230,0.5)', letterSpacing: '0.1em' }}>
          JENU-GUMPU
        </p>
        <p className="text-[11px] mt-1 m-0" style={{ color: 'rgba(255,249,230,0.25)', letterSpacing: '0.15em' }}>
          AI-POWERED HONEY COLLECTIVE
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-12 text-center"
      >
        <div className="flex gap-1 justify-center mb-3">
          {[0, 1, 2].map(i => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.2, delay: i * 0.3 }}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: 'var(--honey-primary)' }}
            />
          ))}
        </div>
        <p className="text-[10px] m-0" style={{ color: 'rgba(255,249,230,0.2)' }}>Forest to Table</p>
      </motion.div>
    </div>
  );
};

function AppContent() {
  const { user, setUser } = useApp();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showSplash, setShowSplash] = useState(true);

  const handleLogin = (userData) => setUser(userData);
  const handleLogout = () => { setUser(null); setActiveTab('dashboard'); };
  const handleNavigate = (tab) => setActiveTab(tab);

  const renderScreen = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard onNavigate={handleNavigate} />;
      case 'harvest':   return <HarvestLog />;
      case 'grading':   return <GradingTool />;
      case 'stock':     return <StockScreen />;
      case 'profit':    return <ProfitScreen />;
      case 'analytics': return <Analytics />;
      case 'settings':  return <Settings onLogout={handleLogout} />;
      default:          return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSplash && <SplashScreen onDone={() => setShowSplash(false)} />}
      </AnimatePresence>

      {!showSplash && (
        <>
          {!user ? (
            <Login onLogin={handleLogin} />
          ) : (
            <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
              {renderScreen()}
            </Layout>
          )}
        </>
      )}
    </>
  );
}

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;
