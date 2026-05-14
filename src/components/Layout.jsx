import React from 'react';
import { useApp } from '../context/AppContext';
import { Home, ClipboardList, ShieldCheck, Package, Calculator, BarChart3, Settings, Languages, User } from 'lucide-react';
import { motion } from 'framer-motion';

const NAV_TABS = [
  { id: 'dashboard', icon: Home },
  { id: 'harvest', icon: ClipboardList },
  { id: 'grading', icon: ShieldCheck },
  { id: 'stock', icon: Package },
  { id: 'profit', icon: Calculator },
  { id: 'analytics', icon: BarChart3 },
  { id: 'settings', icon: Settings },
];

const Layout = ({ children, activeTab, setActiveTab }) => {
  const { lang, setLang, t, user } = useApp();

  // Show 5 tabs in bottom bar (most important), rest via ... overflow
  const visibleTabs = NAV_TABS.slice(0, 5);
  const moreTabs = NAV_TABS.slice(5);
  const [showMore, setShowMore] = React.useState(false);

  const handleTabClick = (id) => {
    setActiveTab(id);
    setShowMore(false);
  };

  const isMoreActive = moreTabs.some(t => t.id === activeTab);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-20 px-5 py-4 flex justify-between items-center backdrop-blur-xl"
        style={{ background: 'rgba(12,17,9,0.85)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div>
          <h1 className="text-xl font-black m-0" style={{ color: 'var(--honey-primary)' }}>{t.appName}</h1>
          <p className="text-[10px] m-0" style={{ color: 'rgba(255,249,230,0.4)' }}>{t.appSubtitle}</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLang(lang === 'kn' ? 'en' : 'kn')}
            className="text-xs px-3 py-1.5 rounded-full border font-bold transition-colors"
            style={{ borderColor: 'var(--honey-primary)', color: 'var(--honey-primary)', background: 'rgba(255,185,0,0.08)' }}
          >
            {lang === 'kn' ? 'EN' : 'ಕನ್ನಡ'}
          </button>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: 'var(--forest-mid)', color: 'var(--honey-primary)', border: '1px solid rgba(255,185,0,0.3)' }}>
            {user?.username?.[0]?.toUpperCase() || '?'}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 px-5 py-4 pb-28">
        {children}
      </main>

      {/* More tabs popup */}
      {showMore && (
        <div className="fixed bottom-24 right-4 z-30 glass-card !p-3 flex flex-col gap-1 w-40">
          {moreTabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-colors"
                style={{ color: isActive ? 'var(--honey-primary)' : 'rgba(255,249,230,0.5)', background: isActive ? 'rgba(255,185,0,0.1)' : 'transparent' }}
              >
                <Icon size={18} />
                {t[tab.id]}
              </button>
            );
          })}
        </div>
      )}
      {showMore && <div className="fixed inset-0 z-20" onClick={() => setShowMore(false)} />}

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-[480px] mx-auto z-30 px-4 py-3 flex justify-around items-center"
        style={{ background: 'rgba(26,36,20,0.95)', backdropFilter: 'blur(20px)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        {visibleTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className="flex flex-col items-center gap-1 relative p-1 min-w-[40px]"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full"
                  style={{ background: 'rgba(255,185,0,0.15)' }}
                />
              )}
              <Icon size={22} style={{ color: isActive ? 'var(--honey-primary)' : 'rgba(255,249,230,0.3)', position: 'relative', zIndex: 1 }} />
              <span className="text-[9px] font-medium" style={{ color: isActive ? 'var(--honey-primary)' : 'rgba(255,249,230,0.3)' }}>
                {t[tab.id]}
              </span>
            </button>
          );
        })}
        {/* More button */}
        <button
          onClick={() => setShowMore(!showMore)}
          className="flex flex-col items-center gap-1 p-1 min-w-[40px]"
        >
          <span className="text-xl leading-none" style={{ color: isMoreActive ? 'var(--honey-primary)' : 'rgba(255,249,230,0.3)' }}>···</span>
          <span className="text-[9px] font-medium" style={{ color: isMoreActive ? 'var(--honey-primary)' : 'rgba(255,249,230,0.3)' }}>
            {lang === 'kn' ? 'ಹೆಚ್ಚು' : 'More'}
          </span>
        </button>
      </nav>
    </div>
  );
};

export default Layout;
