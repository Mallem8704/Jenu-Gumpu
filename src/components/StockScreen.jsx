import React from 'react';
import { useApp } from '../context/AppContext';
import { Package } from 'lucide-react';
import { motion } from 'framer-motion';

const StockScreen = () => {
  const { t, harvests, collectiveStock } = useApp();

  const gradeColor = (g) => g === 'premium' ? '#4CAF50' : g === 'standard' ? '#FFB900' : '#EF4444';
  const gradeLabel = (g) => t['grade' + g?.charAt(0).toUpperCase() + g?.slice(1)] || g;

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-xl font-bold m-0">{t.stockTitle}</h2>

      {/* Total Stock — PRD: "Total Collective Stock: 250 KG" */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="p-6 rounded-3xl text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(135deg, rgba(255,185,0,0.2), rgba(74,55,40,0.4))', border: '1px solid rgba(255,185,0,0.3)' }}
      >
        <div className="absolute inset-0 opacity-10"
          style={{ background: `radial-gradient(circle at 50% 50%, var(--honey-primary) 0%, transparent 70%)` }} />
        <Package size={32} style={{ color: 'var(--honey-primary)' }} className="mx-auto mb-3 relative z-10" />
        <p className="text-xs uppercase tracking-widest m-0 relative z-10" style={{ color: 'rgba(255,249,230,0.5)' }}>
          {t.totalStock}
        </p>
        <p className="text-5xl font-black m-0 mt-2 relative z-10" style={{ color: 'var(--honey-primary)' }}>
          {collectiveStock.toFixed(1)}
          <span className="text-xl font-normal ml-2">KG</span>
        </p>
        <p className="text-xs mt-2 m-0 relative z-10" style={{ color: 'rgba(255,249,230,0.4)' }}>
          {harvests.length} {t.batchWiseStock.split(' ')[0].toLowerCase()} entries
        </p>
      </motion.div>

      {/* Grade Breakdown */}
      {harvests.length > 0 && (() => {
        const gradeBreakdown = harvests.reduce((acc, h) => {
          acc[h.grade] = (acc[h.grade] || 0) + parseFloat(h.quantity || 0);
          return acc;
        }, {});
        return (
          <div className="grid grid-cols-3 gap-3">
            {['premium', 'standard', 'low'].map(g => (
              <div key={g} className="glass-card text-center !p-4">
                <p className="text-lg font-black m-0" style={{ color: gradeColor(g) }}>
                  {(gradeBreakdown[g] || 0).toFixed(1)}
                </p>
                <p className="text-[9px] mt-1 m-0" style={{ color: 'rgba(255,249,230,0.4)' }}>kg {gradeLabel(g)}</p>
              </div>
            ))}
          </div>
        );
      })()}

      {/* Batch-wise Stock list — PRD Section 6.4 */}
      <div>
        <h3 className="text-sm font-bold mb-3" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.batchWiseStock}</h3>
        {harvests.length === 0 ? (
          <p className="text-xs text-center py-8" style={{ color: 'rgba(255,249,230,0.2)' }}>{t.noStock}</p>
        ) : (
          <div className="space-y-3">
            {harvests.map((h, i) => (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="glass-card !mb-0 flex items-center gap-4"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: `${gradeColor(h.grade)}18` }}>
                  <span className="text-base">🍯</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold m-0 truncate">{h.floralSource}</p>
                  <p className="text-[9px] m-0 font-mono" style={{ color: 'var(--honey-primary)' }}>{h.id}</p>
                  <p className="text-[9px] m-0" style={{ color: 'rgba(255,249,230,0.35)' }}>{h.location} • {h.date}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-sm font-black m-0" style={{ color: 'var(--honey-primary)' }}>{h.quantity} kg</p>
                  <span className="text-[9px] px-2 py-0.5 rounded-full font-bold"
                    style={{ background: `${gradeColor(h.grade)}15`, color: gradeColor(h.grade) }}>
                    {gradeLabel(h.grade)}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StockScreen;
