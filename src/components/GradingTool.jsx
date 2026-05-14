import React, { useState } from 'react';
import { useApp, getGrade, getAIRecommendation } from '../context/AppContext';
import { Droplets, Sparkles, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// PRD Grading Scale (Section 6.3)
const GRADE_SCALE = [
  { range: '< 18%', gradeKey: 'gradePremium', color: '#4CAF50', bg: 'rgba(76,175,80,0.12)', icon: '⭐⭐⭐' },
  { range: '18 – 22%', gradeKey: 'gradeStandard', color: '#FFB900', bg: 'rgba(255,185,0,0.12)', icon: '⭐⭐' },
  { range: '> 22%', gradeKey: 'gradeLow', color: '#EF4444', bg: 'rgba(239,68,68,0.12)', icon: '⭐' },
];

const FLORAL_SOURCES = ['Coffee Blossom', 'Wildflower', 'Neem', 'Forest Honey', 'Sunflower'];

const GradingTool = () => {
  const { t, lang } = useApp();
  const [moisture, setMoisture] = useState('');
  const [quantity, setQuantity] = useState('');
  const [floralSource, setFloralSource] = useState('Wildflower');
  const [result, setResult] = useState(null);
  const [aiText, setAiText] = useState('');
  const [loadingAI, setLoadingAI] = useState(false);

  const handleCheck = () => {
    if (!moisture) return;
    const grade = getGrade(moisture);
    setResult({ grade, moisture });
    setAiText('');

    // Simulate GenAI API call (PRD Section 6.8)
    setLoadingAI(true);
    setTimeout(() => {
      const rec = getAIRecommendation(floralSource, moisture, quantity || 10, lang);
      setAiText(rec);
      setLoadingAI(false);
    }, 1400);
  };

  const gradeInfo = result
    ? GRADE_SCALE.find(g => g.gradeKey === 'grade' + result.grade.charAt(0).toUpperCase() + result.grade.slice(1))
    : null;

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-xl font-bold m-0">{t.gradingTitle}</h2>

      {/* Input Card */}
      <div className="glass-card space-y-5">
        {/* Floral Source */}
        <div>
          <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.floralSource}</label>
          <div className="flex flex-wrap gap-2">
            {FLORAL_SOURCES.map(s => (
              <button
                key={s}
                type="button"
                onClick={() => setFloralSource(s)}
                className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: floralSource === s ? 'var(--honey-primary)' : 'var(--forest-dark)',
                  color: floralSource === s ? 'var(--forest-dark)' : 'rgba(255,249,230,0.6)',
                  border: '1px solid rgba(255,255,255,0.08)'
                }}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Moisture Input */}
          <div>
            <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>
              <Droplets size={10} className="inline mr-1" style={{ color: '#64B5F6' }} />
              {t.moistureLevel}
            </label>
            <input
              type="number" step="0.1" min="10" max="50"
              placeholder={t.enterMoisture}
              className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
              style={{ background: 'var(--forest-dark)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--beeswax)' }}
              value={moisture}
              onChange={e => { setMoisture(e.target.value); setResult(null); setAiText(''); }}
            />
          </div>

          {/* Quantity */}
          <div>
            <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.quantity}</label>
            <input
              type="number" step="0.1" min="0"
              placeholder="kg"
              className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
              style={{ background: 'var(--forest-dark)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--beeswax)' }}
              value={quantity}
              onChange={e => setQuantity(e.target.value)}
            />
          </div>
        </div>

        <button
          onClick={handleCheck}
          disabled={!moisture}
          className="btn-primary flex items-center justify-center gap-2"
          style={{ opacity: !moisture ? 0.5 : 1 }}
        >
          <CheckCircle2 size={18} />
          {t.checkGrade}
        </button>

        <p className="text-[10px] text-center" style={{ color: 'rgba(255,249,230,0.3)' }}>
          {t.moistureHint}
        </p>
      </div>

      {/* Grading Scale reference (PRD section 6.3) */}
      <div>
        <h3 className="text-sm font-bold mb-3" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.gradingScale}</h3>
        <div className="space-y-3">
          {GRADE_SCALE.map((g) => (
            <div
              key={g.gradeKey}
              className="flex justify-between items-center px-5 py-4 rounded-2xl"
              style={{
                background: result && gradeInfo?.gradeKey === g.gradeKey ? g.bg : 'rgba(255,255,255,0.03)',
                border: result && gradeInfo?.gradeKey === g.gradeKey ? `1px solid ${g.color}40` : '1px solid rgba(255,255,255,0.06)',
                transition: 'all 0.4s'
              }}
            >
              <div>
                <span className="text-base font-black" style={{ color: g.color }}>{t[g.gradeKey]}</span>
                <span className="ml-3 text-xs" style={{ color: 'rgba(255,249,230,0.4)' }}>{g.range}</span>
              </div>
              <span className="text-lg">{g.icon}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Result */}
      <AnimatePresence>
        {result && gradeInfo && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="rounded-3xl p-5"
            style={{ background: gradeInfo.bg, border: `1px solid ${gradeInfo.color}40` }}
          >
            <div className="flex items-center gap-3 mb-3">
              <span className="text-3xl">{gradeInfo.icon}</span>
              <div>
                <h3 className="text-xl font-black m-0" style={{ color: gradeInfo.color }}>
                  {t[gradeInfo.gradeKey]}
                </h3>
                <p className="text-xs m-0" style={{ color: 'rgba(255,249,230,0.5)' }}>
                  {result.moisture}% — {t[`gradeDesc`]?.[result.grade] || t['grade' + result.grade.charAt(0).toUpperCase() + result.grade.slice(1)]}
                </p>
              </div>
            </div>

            {/* AI Recommendation (PRD Section 6.8) */}
            <div className="mt-4 p-4 rounded-2xl" style={{ background: 'rgba(0,0,0,0.2)' }}>
              <div className="flex items-center gap-2 mb-2">
                <Sparkles size={14} style={{ color: 'var(--honey-primary)' }} />
                <span className="text-xs font-bold" style={{ color: 'var(--honey-primary)' }}>{t.aiPowered}</span>
              </div>
              {loadingAI ? (
                <div className="flex items-center gap-2 text-xs" style={{ color: 'rgba(255,249,230,0.4)' }}>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                    className="w-3 h-3 rounded-full border-2"
                    style={{ borderColor: 'var(--honey-primary)', borderTopColor: 'transparent' }}
                  />
                  {t.generating}
                </div>
              ) : (
                <p className="text-xs leading-relaxed m-0" style={{ color: 'rgba(255,249,230,0.75)' }}>
                  {aiText}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GradingTool;
