import React from 'react';
import { useApp } from '../context/AppContext';
import { ClipboardList, ShieldCheck, Package, Calculator, BarChart3, TrendingUp, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const CARD_DEFS = [
  { screen: 'harvest',   icon: ClipboardList, color: '#FFB900', bg: 'rgba(255,185,0,0.12)',  labelKey: 'harvest' },
  { screen: 'grading',   icon: ShieldCheck,   color: '#4CAF50', bg: 'rgba(76,175,80,0.12)',  labelKey: 'grading' },
  { screen: 'stock',     icon: Package,       color: '#FF8C00', bg: 'rgba(255,140,0,0.12)',  labelKey: 'stock' },
  { screen: 'profit',    icon: Calculator,    color: '#64B5F6', bg: 'rgba(100,181,246,0.12)',labelKey: 'profit' },
  { screen: 'analytics', icon: BarChart3,     color: '#CE93D8', bg: 'rgba(206,147,216,0.12)',labelKey: 'analytics' },
];

const Dashboard = ({ onNavigate }) => {
  const { t, collectiveStock, harvests, user } = useApp();
  const retailPrice = 850;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-5 rounded-3xl"
        style={{ background: 'linear-gradient(135deg, rgba(255,185,0,0.15), rgba(74,55,40,0.3))', border: '1px solid rgba(255,185,0,0.2)' }}
      >
        <p className="text-xs m-0" style={{ color: 'rgba(255,249,230,0.5)' }}>
          {new Date().toLocaleDateString(t === 'kn' ? 'kn-IN' : 'en-IN', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
        <h2 className="text-xl font-black m-0 mt-1" style={{ color: 'var(--honey-primary)' }}>
          {t.welcome.replace('!', ',')} {user?.username}! 🍯
        </h2>
        <p className="text-xs mt-1 m-0" style={{ color: 'rgba(255,249,230,0.4)' }}>{t.tagline}</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="glass-card relative overflow-hidden"
          style={{ cursor: 'pointer' }}
          onClick={() => onNavigate('stock')}
        >
          <div className="absolute bottom-0 left-0 right-0 transition-all duration-1000"
            style={{ height: `${Math.min(collectiveStock * 2, 80)}%`, background: 'rgba(255,185,0,0.07)' }} />
          <Package size={20} style={{ color: 'var(--honey-primary)' }} className="mb-2 relative z-10" />
          <p className="text-xs m-0 relative z-10" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.collectiveStock}</p>
          <p className="text-2xl font-black m-0 relative z-10" style={{ color: 'var(--honey-primary)' }}>
            {collectiveStock.toFixed(1)} <span className="text-sm font-normal">kg</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="glass-card"
        >
          <TrendingUp size={20} style={{ color: '#4CAF50' }} className="mb-2" />
          <p className="text-xs m-0" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.totalEarnings}</p>
          <p className="text-2xl font-black m-0" style={{ color: '#4CAF50' }}>
            ₹{(collectiveStock * retailPrice).toLocaleString('en-IN')}
          </p>
        </motion.div>
      </div>

      {/* Quick Actions */}
      <section>
        <h3 className="text-sm font-bold mb-3 px-1" style={{ color: 'rgba(255,249,230,0.6)' }}>
          {t.quickActions}
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {CARD_DEFS.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.button
                key={c.screen}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * i + 0.3 }}
                whileHover={{ x: 6 }}
                onClick={() => onNavigate(c.screen)}
                className="glass-card !mb-0 flex items-center gap-4 text-left"
              >
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0"
                  style={{ background: c.bg }}>
                  <Icon size={24} style={{ color: c.color }} />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold m-0" style={{ color: 'var(--beeswax)' }}>{t[c.labelKey]}</p>
                </div>
                <ArrowRight size={16} style={{ color: 'rgba(255,249,230,0.2)' }} />
              </motion.button>
            );
          })}
        </div>
      </section>

      {/* Recent Harvests */}
      <section>
        <h3 className="text-sm font-bold mb-3 px-1" style={{ color: 'rgba(255,249,230,0.6)' }}>
          {t.recentActivity}
        </h3>
        {harvests.length === 0 ? (
          <p className="text-xs text-center py-6" style={{ color: 'rgba(255,249,230,0.2)' }}>{t.noHarvests}</p>
        ) : (
          <div className="space-y-3">
            {harvests.slice(0, 3).map((h) => (
              <div key={h.id} className="glass-card !mb-0 flex justify-between items-center">
                <div>
                  <p className="text-sm font-bold m-0">{h.floralSource}</p>
                  <p className="text-[10px] m-0" style={{ color: 'rgba(255,249,230,0.35)' }}>
                    {h.location} • {h.id}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold m-0" style={{ color: 'var(--honey-primary)' }}>{h.quantity} kg</p>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                    style={{
                      background: h.grade === 'premium' ? 'rgba(76,175,80,0.15)' : h.grade === 'standard' ? 'rgba(255,185,0,0.15)' : 'rgba(239,68,68,0.15)',
                      color: h.grade === 'premium' ? '#4CAF50' : h.grade === 'standard' ? '#FFB900' : '#EF4444'
                    }}>
                    {t['grade' + h.grade.charAt(0).toUpperCase() + h.grade.slice(1)]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
