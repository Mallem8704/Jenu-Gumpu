import React, { useState } from 'react';
import { useApp, calcProfit } from '../context/AppContext';
import { Calculator, IndianRupee, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfitScreen = () => {
  const { t, collectiveStock } = useApp();

  // PRD Section 6.6 Inputs
  const [qty, setQty] = useState(collectiveStock > 0 ? collectiveStock.toFixed(1) : '10');
  const [retail, setRetail] = useState('850');
  const [wholesale, setWholesale] = useState('350');
  const [filterCost, setFilterCost] = useState('50');
  const [calculated, setCalculated] = useState(false);

  // PRD Formula: Profit = (Retail Price - Cost Price) × Quantity - Filtering Cost
  const grossRevenue = parseFloat(qty) * parseFloat(retail);
  const filterTotal = parseFloat(filterCost) * parseFloat(qty);
  const profit = calcProfit(parseFloat(qty), parseFloat(retail), parseFloat(wholesale), parseFloat(filterCost));

  const inputStyle = {
    background: 'var(--forest-dark)',
    border: '1px solid rgba(255,255,255,0.08)',
    color: 'var(--beeswax)',
    borderRadius: '16px',
    padding: '14px 16px',
    fontSize: '14px',
    width: '100%',
    outline: 'none'
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h2 className="text-xl font-bold m-0">{t.profitTitle}</h2>

      {/* Formula Banner */}
      <div className="px-4 py-3 rounded-2xl flex items-start gap-3"
        style={{ background: 'rgba(255,185,0,0.08)', border: '1px solid rgba(255,185,0,0.2)' }}>
        <Info size={14} style={{ color: 'var(--honey-primary)', flexShrink: 0, marginTop: 2 }} />
        <p className="text-[10px] m-0 leading-relaxed" style={{ color: 'rgba(255,249,230,0.5)' }}>
          {t.profitFormula}
        </p>
      </div>

      {/* Inputs */}
      <div className="glass-card space-y-4">
        <h3 className="text-sm font-bold m-0 mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>Inputs</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.quantity}</label>
            <input type="number" style={inputStyle} value={qty} onChange={e => { setQty(e.target.value); setCalculated(false); }} />
          </div>
          <div>
            <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.retailPrice}</label>
            <input type="number" style={inputStyle} value={retail} onChange={e => { setRetail(e.target.value); setCalculated(false); }} />
          </div>
          <div>
            <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.wholesalePrice}</label>
            <input type="number" style={inputStyle} value={wholesale} onChange={e => { setWholesale(e.target.value); setCalculated(false); }} />
          </div>
          <div>
            <label className="text-xs block mb-2" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.filteringCost}</label>
            <input type="number" style={inputStyle} value={filterCost} onChange={e => { setFilterCost(e.target.value); setCalculated(false); }} />
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.97 }}
          onClick={() => setCalculated(true)}
          className="btn-primary flex items-center justify-center gap-2"
        >
          <Calculator size={18} />
          {t.calculate}
        </motion.button>
      </div>

      {/* Results */}
      {calculated && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card space-y-4"
        >
          <h3 className="text-sm font-bold m-0" style={{ color: 'rgba(255,249,230,0.5)' }}>Results</h3>

          <div className="space-y-3">
            <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-sm" style={{ color: 'rgba(255,249,230,0.6)' }}>{t.grossRevenue}</span>
              <span className="text-sm font-bold" style={{ color: 'var(--beeswax)' }}>₹{grossRevenue.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
              <span className="text-sm" style={{ color: 'rgba(255,249,230,0.6)' }}>{t.filteringTotal}</span>
              <span className="text-sm font-bold" style={{ color: '#EF4444' }}>- ₹{filterTotal.toLocaleString('en-IN')}</span>
            </div>

            <div className="flex justify-between items-center py-3 px-4 rounded-2xl"
              style={{ background: profit >= 0 ? 'rgba(76,175,80,0.12)' : 'rgba(239,68,68,0.12)', border: `1px solid ${profit >= 0 ? '#4CAF5040' : '#EF444440'}` }}>
              <div className="flex items-center gap-2">
                <TrendingUp size={18} style={{ color: profit >= 0 ? '#4CAF50' : '#EF4444' }} />
                <span className="text-sm font-bold">{t.estimatedProfit}</span>
              </div>
              <div className="flex items-center gap-1">
                <IndianRupee size={16} style={{ color: profit >= 0 ? '#4CAF50' : '#EF4444' }} />
                <span className="text-2xl font-black" style={{ color: profit >= 0 ? '#4CAF50' : '#EF4444' }}>
                  {Math.abs(profit).toLocaleString('en-IN')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Market Prices (PRD Section 6.7) */}
      <div>
        <h3 className="text-sm font-bold mb-3" style={{ color: 'rgba(255,249,230,0.5)' }}>{t.marketPrices}</h3>
        {[
          { label: t.retailMarket, price: 850, trend: '+12%' },
          { label: t.bigRetail, price: 650, trend: '+6%' },
          { label: t.wholesale, price: 350, trend: '+3%' },
          { label: t.localMiddleman, price: 280, trend: '-5%' },
        ].map((row, i) => (
          <div key={i} className="glass-card !mb-3 flex justify-between items-center">
            <div>
              <p className="text-sm font-bold m-0">{row.label}</p>
              <p className="text-[10px] m-0" style={{ color: 'rgba(255,249,230,0.35)' }}>Updated today</p>
            </div>
            <div className="text-right">
              <p className="text-lg font-black m-0" style={{ color: 'var(--honey-primary)' }}>₹{row.price}</p>
              <p className="text-[9px] m-0" style={{ color: row.trend.startsWith('+') ? '#4CAF50' : '#EF4444' }}>{row.trend}</p>
            </div>
          </div>
        ))}
        <p className="text-[10px] px-2 text-center" style={{ color: 'rgba(255,249,230,0.25)' }}>{t.priceTip}</p>
      </div>
    </div>
  );
};

export default ProfitScreen;
