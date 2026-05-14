import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3 } from 'lucide-react';
import { motion } from 'framer-motion';

// Simple SVG bar chart component (no external lib needed)
const BarChart = ({ data, colorFn, unit = 'kg', maxLabel }) => {
  const max = Math.max(...data.map(d => d.value), 1);
  return (
    <div className="space-y-3">
      {data.map((d, i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="text-[10px] w-20 flex-shrink-0 text-right" style={{ color: 'rgba(255,249,230,0.45)' }}>
            {d.label}
          </span>
          <div className="flex-1 h-7 rounded-lg overflow-hidden" style={{ background: 'rgba(255,255,255,0.04)' }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(d.value / max) * 100}%` }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
              className="h-full rounded-lg flex items-center px-2"
              style={{ background: colorFn ? colorFn(i) : 'var(--honey-primary)', minWidth: d.value > 0 ? '28px' : 0 }}
            >
              {d.value > 0 && (
                <span className="text-[9px] font-black" style={{ color: 'var(--forest-dark)' }}>
                  {d.value}{unit}
                </span>
              )}
            </motion.div>
          </div>
        </div>
      ))}
    </div>
  );
};

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
const MONTHS_KN = ['ಜನ', 'ಫೆಬ್', 'ಮಾರ್', 'ಏಪ್ರಿ', 'ಮೇ', 'ಜೂನ್', 'ಜುಲ್', 'ಆಗ', 'ಸೆಪ್ಟ', 'ಅಕ್ಟೋ', 'ನವ', 'ಡಿಸೆ'];
const FLORAL_COLORS = ['#FFB900', '#4CAF50', '#64B5F6', '#FF8C00', '#CE93D8'];
const FLORAL_SOURCES_EN = ['Coffee Blossom', 'Wildflower', 'Neem', 'Forest Honey', 'Sunflower'];

const Analytics = () => {
  const { t, lang, harvests } = useApp();

  // Build monthly collection data
  const months = lang === 'kn' ? MONTHS_KN : MONTHS;
  const monthlyData = months.map((label, idx) => {
    const val = harvests
      .filter(h => new Date(h.timestamp).getMonth() === idx)
      .reduce((s, h) => s + parseFloat(h.quantity || 0), 0);
    return { label, value: parseFloat(val.toFixed(1)) };
  });

  // Floral source breakdown
  const floralData = FLORAL_SOURCES_EN.map((src, i) => {
    const val = harvests
      .filter(h => h.floralSource === src)
      .reduce((s, h) => s + parseFloat(h.quantity || 0), 0);
    const label = lang === 'kn'
      ? ['ಕಾಫಿ', 'ಕಾಡು', 'ಬೇವು', 'ಕಾಡು ಜೇನು', 'ಸೂರ್ಯ'][i]
      : ['Coffee', 'Wild', 'Neem', 'Forest', 'Sunfl.'][i];
    return { label, value: parseFloat(val.toFixed(1)) };
  }).filter(d => d.value > 0);

  // Profit trend (monthly estimated profit)
  const retailPrice = 850;
  const filterCost = 50;
  const profitData = months.map((label, idx) => {
    const qty = harvests
      .filter(h => new Date(h.timestamp).getMonth() === idx)
      .reduce((s, h) => s + parseFloat(h.quantity || 0), 0);
    const val = qty > 0 ? Math.round((retailPrice - filterCost) * qty) : 0;
    return { label, value: val };
  });

  const hasData = harvests.length > 0;

  return (
    <div className="animate-fade-in space-y-8">
      <h2 className="text-xl font-bold m-0">{t.analyticsTitle}</h2>

      {!hasData ? (
        <div className="text-center py-16" style={{ color: 'rgba(255,249,230,0.2)' }}>
          <BarChart3 size={48} className="mx-auto mb-4 opacity-30" />
          <p className="text-sm">{t.noData}</p>
        </div>
      ) : (
        <>
          {/* Monthly Collection */}
          <section className="glass-card">
            <h3 className="text-sm font-bold mb-4 m-0">{t.monthlyCollection}</h3>
            <BarChart
              data={monthlyData}
              colorFn={() => 'var(--honey-primary)'}
              unit="kg"
            />
          </section>

          {/* Floral Source Breakdown */}
          {floralData.length > 0 && (
            <section className="glass-card">
              <h3 className="text-sm font-bold mb-4 m-0">{t.floralBreakdown}</h3>
              <BarChart
                data={floralData}
                colorFn={(i) => FLORAL_COLORS[i % FLORAL_COLORS.length]}
                unit="kg"
              />

              {/* Pie-style legend */}
              <div className="flex flex-wrap gap-3 mt-4 pt-4" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                {floralData.map((d, i) => (
                  <div key={i} className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full" style={{ background: FLORAL_COLORS[i % FLORAL_COLORS.length] }} />
                    <span className="text-[9px]" style={{ color: 'rgba(255,249,230,0.5)' }}>{d.label}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Profit Trend */}
          <section className="glass-card">
            <h3 className="text-sm font-bold mb-4 m-0">{t.profitTrend}</h3>
            <BarChart
              data={profitData}
              colorFn={() => '#4CAF50'}
              unit=""
            />
            <p className="text-[9px] mt-3 m-0" style={{ color: 'rgba(255,249,230,0.25)' }}>
              * Estimated at ₹{retailPrice}/kg retail after ₹{filterCost}/kg filtering cost
            </p>
          </section>
        </>
      )}
    </div>
  );
};

export default Analytics;
