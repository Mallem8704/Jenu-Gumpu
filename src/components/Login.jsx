import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { motion } from 'framer-motion';

const Login = ({ onLogin }) => {
  const { t, lang, setLang } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ username: '', phone: '' });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.username.trim()) { setError('Username is required'); return; }
    if (!/^\d{10}$/.test(form.phone)) { setError('Enter a valid 10-digit mobile number'); return; }
    const userData = { username: form.username, phone: form.phone };
    onLogin(userData);
  };

  return (
    <div className="min-h-screen bg-forest-dark flex flex-col justify-between p-6">
      {/* Header Branding */}
      <div className="pt-12 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="w-20 h-20 rounded-full bg-honey-primary/20 flex items-center justify-center mx-auto mb-4 border border-honey-primary/40 shadow-[0_0_30px_rgba(255,185,0,0.3)]">
            <span className="text-4xl">🍯</span>
          </div>
          <h1 className="text-3xl font-black text-honey-primary">{t.appName}</h1>
          <p className="text-xs text-beeswax/50 mt-1 tracking-widest uppercase">{t.tagline}</p>
        </motion.div>
      </div>

      {/* Form */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
      >
        <h2 className="text-xl font-bold mb-6">
          {isRegister ? t.register : t.login}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-xs text-beeswax/60 block mb-2">{t.username}</label>
            <input
              type="text"
              placeholder={lang === 'kn' ? "ರಾಮಣ್ಣ" : "Your name"}
              className="w-full bg-forest-dark border border-glass-border rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-honey-primary transition-colors"
              value={form.username}
              onChange={e => { setForm({ ...form, username: e.target.value }); setError(''); }}
            />
          </div>
          <div>
            <label className="text-xs text-beeswax/60 block mb-2">{t.phoneNumber}</label>
            <div className="flex gap-2">
              <span className="bg-forest-mid border border-glass-border rounded-2xl px-4 py-4 text-sm font-bold text-honey-primary">+91</span>
              <input
                type="tel"
                maxLength={10}
                placeholder="9876543210"
                className="flex-1 bg-forest-dark border border-glass-border rounded-2xl px-4 py-4 text-sm focus:outline-none focus:border-honey-primary transition-colors"
                value={form.phone}
                onChange={e => { setForm({ ...form, phone: e.target.value.replace(/\D/g, '') }); setError(''); }}
              />
            </div>
          </div>

          {error && <p className="text-red-400 text-xs px-1">{error}</p>}

          <button type="submit" className="btn-primary mt-2">
            {t.continueBtn}
          </button>
        </form>

        <p
          className="text-center text-xs text-beeswax/40 mt-5 cursor-pointer hover:text-honey-primary transition-colors"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? t.alreadyAccount : t.newHere}
        </p>
      </motion.div>

      {/* Language Toggle */}
      <div className="text-center pb-4">
        <button
          onClick={() => setLang(lang === 'kn' ? 'en' : 'kn')}
          className="text-xs text-beeswax/30 hover:text-honey-primary transition-colors"
        >
          {lang === 'kn' ? 'Switch to English' : 'ಕನ್ನಡಕ್ಕೆ ಬದಲಾಯಿಸಿ'}
        </button>
      </div>
    </div>
  );
};

export default Login;
