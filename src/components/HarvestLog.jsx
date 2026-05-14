import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Plus, X, MapPin, Droplets, Trash2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// PRD Floral Source Options (Section 6.2)
const FLORAL_SOURCES_EN = ['Coffee Blossom', 'Wildflower', 'Neem', 'Forest Honey', 'Sunflower'];
const FLORAL_SOURCES_KN = ['ಕಾಫಿ ಹೂವು', 'ಕಾಡುಹೂವು', 'ಬೇವು', 'ಕಾಡು ಜೇನು', 'ಸೂರ್ಯಕಾಂತಿ'];

const HarvestLog = () => {
  const { t, lang, harvests, addHarvest, deleteHarvest } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({
    floralSource: FLORAL_SOURCES_EN[0],
    quantity: '',
    location: '',
    date: new Date().toISOString().split('T')[0],
    moisture: '17'
  });

  const sources = lang === 'kn' ? FLORAL_SOURCES_KN : FLORAL_SOURCES_EN;
  const sourcesEN = FLORAL_SOURCES_EN; // Always store EN internally for AI key lookup

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.quantity || !form.location) return;
    addHarvest({
      ...form,
      floralSource: lang === 'kn'
        ? FLORAL_SOURCES_EN[FLORAL_SOURCES_KN.indexOf(form.floralSource)] || form.floralSource
        : form.floralSource
    });
    setShowModal(false);
    setForm({ floralSource: FLORAL_SOURCES_EN[0], quantity: '', location: '', date: new Date().toISOString().split('T')[0], moisture: '17' });
  };

  const gradeColor = (g) => g === 'premium' ? '#4CAF50' : g === 'standard' ? '#FFB900' : '#EF4444';
  const gradeLabel = (g) => t['grade' + g.charAt(0).toUpperCase() + g.slice(1)];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold m-0">{t.harvestLog}</h2>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowModal(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-2xl font-bold text-sm shadow-lg"
          style={{ background: 'linear-gradient(135deg, var(--honey-primary), var(--honey-secondary))', color: 'var(--forest-dark)' }}
        >
          <Plus size={18} />
          {t.addHarvest}
        </motion.button>
      </div>

      {/* Harvest List */}
      <div className="space-y-4">
        {harvests.length === 0 && (
          <div className="text-center py-16" style={{ color: 'rgba(255,249,230,0.2)' }}>
            <div className="text-5xl mb-4">🍯</div>
            <p className="text-sm">{t.noHarvests}</p>
          </div>
        )}
        {harvests.map((h, i) => (
          <motion.div
            key={h.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass-card !mb-0"
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <span className="inline-block text-[9px] px-2 py-0.5 rounded-md font-bold mb-1"
                  style={{ background: 'var(--forest-mid)', color: 'var(--honey-primary)', letterSpacing: '0.05em' }}>
                  {h.id}
                </span>
                <h3 className="text-base font-bold m-0">{h.floralSource}</h3>
                <div className="flex items-center gap-1 text-[10px] mt-1" style={{ color: 'rgba(255,249,230,0.4)' }}>
                  <MapPin size={10} />
                  {h.location} • {h.date}
                </div>
              </div>
              <div className="text-right flex flex-col items-end gap-2">
                <span className="text-xl font-black" style={{ color: 'var(--honey-primary)' }}>{h.quantity} kg</span>
                <span className="text-[9px] px-2 py-1 rounded-full font-bold"
                  style={{ background: `${gradeColor(h.grade)}18`, color: gradeColor(h.grade) }}>
                  {gradeLabel(h.grade)}
                </span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              <div className="flex items-center gap-1 text-[10px]" style={{ color: 'rgba(255,249,230,0.4)' }}>
                <Droplets size={10} style={{ color: '#64B5F6' }} />
                {t.moistureLevel}: <span className="font-bold ml-1" style={{ color: 'var(--beeswax)' }}>{h.moisture}%</span>
              </div>
              <button
                onClick={() => deleteHarvest(h.id)}
                className="p-2 rounded-xl transition-colors"
                style={{ color: 'rgba(239,68,68,0.5)' }}
              >
                <Trash2 size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-end justify-center">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowModal(false)}
              className="absolute inset-0"
              style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            />
            <motion.div
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="relative w-full max-w-[480px] p-6 pb-10 rounded-t-[32px]"
              style={{ background: 'var(--forest-mid)', border: '1px solid rgba(255,255,255,0.08)', borderBottom: 'none' }}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold m-0">{t.addHarvest}</h3>
                <button onClick={() => setShowModal(false)} className="p-2 rounded-full glass-card !mb-0">
                  <X size={18} />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Floral Source */}
                <div>
                  <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.floralSource}</label>
                  <div className="flex flex-wrap gap-2">
                    {sources.map((s, i) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => setForm({ ...form, floralSource: lang === 'kn' ? s : FLORAL_SOURCES_EN[i] })}
                        className="px-3 py-2 rounded-xl text-xs font-bold transition-all"
                        style={{
                          background: form.floralSource === (lang === 'kn' ? s : FLORAL_SOURCES_EN[i]) ? 'var(--honey-primary)' : 'var(--forest-dark)',
                          color: form.floralSource === (lang === 'kn' ? s : FLORAL_SOURCES_EN[i]) ? 'var(--forest-dark)' : 'rgba(255,249,230,0.6)',
                          border: '1px solid rgba(255,255,255,0.08)'
                        }}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.quantity}</label>
                    <input
                      type="number" step="0.1" min="0" required
                      placeholder="0.0"
                      className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                      style={{ background: 'var(--forest-dark)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--beeswax)' }}
                      value={form.quantity}
                      onChange={e => setForm({ ...form, quantity: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.moistureLevel}</label>
                    <input
                      type="number" step="0.1" min="10" max="40"
                      placeholder="18"
                      className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                      style={{ background: 'var(--forest-dark)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--beeswax)' }}
                      value={form.moisture}
                      onChange={e => setForm({ ...form, moisture: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.location}</label>
                  <input
                    type="text" required
                    placeholder="e.g. Nagarhole / ನಾಗರಹೊಳೆ"
                    className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                    style={{ background: 'var(--forest-dark)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--beeswax)' }}
                    value={form.location}
                    onChange={e => setForm({ ...form, location: e.target.value })}
                  />
                </div>

                <div>
                  <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.date}</label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 rounded-2xl text-sm focus:outline-none"
                    style={{ background: 'var(--forest-dark)', border: '1px solid rgba(255,255,255,0.08)', color: 'var(--beeswax)' }}
                    value={form.date}
                    onChange={e => setForm({ ...form, date: e.target.value })}
                  />
                </div>

                <button type="submit" className="btn-primary">{t.save}</button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HarvestLog;
