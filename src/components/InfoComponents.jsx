import React from 'react';
import { useApp } from '../context/AppContext';
import { BarChart3, ArrowUpRight, ArrowDownRight, Leaf, ShieldCheck, HeartPulse } from 'lucide-react';

export const PriceMonitor = () => {
  const { t } = useApp();
  
  const priceData = [
    { source: 'Urban Retail (Bengaluru)', price: 850, trend: 'up' },
    { source: 'Big Retail Chain', price: 650, trend: 'up' },
    { source: 'Local Middleman', price: 280, trend: 'down' },
    { source: 'Wholesale Market', price: 350, trend: 'stable' }
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <BarChart3 size={20} className="text-honey-primary" />
        <h2 className="text-xl font-bold m-0">{t.prices}</h2>
      </div>

      <div className="space-y-4">
        {priceData.map((d, i) => (
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            key={i} 
            className="glass-card p-5"
          >
            <div className="flex justify-between items-center mb-3">
              <div>
                <p className="text-sm font-bold m-0">{d.source}</p>
                <p className="text-[10px] text-beeswax/40 m-0">Updated 2h ago</p>
              </div>
              <div className="text-right">
                <div className="flex items-center justify-end gap-1 text-xl font-black text-honey-primary">
                  <span>₹{d.price}</span>
                  {d.trend === 'up' && <ArrowUpRight size={16} className="text-moss-green" />}
                  {d.trend === 'down' && <ArrowDownRight size={16} className="text-red-400" />}
                </div>
              </div>
            </div>
            
            {/* Price Bar */}
            <div className="w-full h-1.5 bg-forest-mid rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: `${(d.price / 850) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`h-full ${d.price > 600 ? 'bg-moss-green' : 'bg-honey-primary/40'}`}
              />
            </div>
          </motion.div>
        ))}
      </div>

      <div className="p-6 rounded-[32px] bg-gradient-to-br from-honey-primary/20 to-transparent border border-honey-primary/30">
        <h3 className="text-sm font-bold mb-2">Pro Tip: Value Addition</h3>
        <p className="text-xs text-beeswax/60 leading-relaxed m-0">
          Glass bottling and local branding can increase your price by <span className="text-honey-primary font-bold">2.5x</span> compared to selling raw to middlemen.
        </p>
      </div>
    </div>
  );
};

export const SustainabilityGuide = () => {
  const { t } = useApp();
  
  const tips = [
    { 
      icon: ShieldCheck, 
      title: 'Partial Harvest', 
      desc: 'Never take the entire comb. Leave 30% for the bees to survive the off-season.',
      color: 'text-moss-green'
    },
    { 
      icon: HeartPulse, 
      title: 'Smoke Wisely', 
      desc: 'Use natural cool smoke. Excessive heat can kill the queen and the brood.',
      color: 'text-blue-400'
    },
    { 
      icon: Leaf, 
      title: 'Biodiversity', 
      desc: 'Protect the floral sources. Avoid harvesting from areas with recent pesticide use.',
      color: 'text-orange-400'
    }
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <Leaf size={20} className="text-moss-green" />
        <h2 className="text-xl font-bold m-0">{t.sustainableTips}</h2>
      </div>

      <div className="grid gap-4">
        {tips.map((tip, i) => {
          const Icon = tip.icon;
          return (
            <div key={i} className="glass-card flex gap-4 p-5">
              <div className={`p-3 rounded-2xl bg-forest-mid h-fit ${tip.color}`}>
                <Icon size={24} />
              </div>
              <div>
                <h3 className="text-sm font-bold mb-1">{tip.title}</h3>
                <p className="text-xs text-beeswax/60 leading-relaxed m-0">{tip.desc}</p>
              </div>
            </div>
          );
        })}
      </div>

      <div className="glass-card border-honey-primary/30 bg-honey-primary/5">
        <h3 className="text-sm font-bold mb-2 text-honey-primary">"Forest-to-Table" Promise</h3>
        <p className="text-xs text-beeswax/60 leading-relaxed m-0 italic">
          By following these rules, we ensure that our children will also find honey in these forests. Our honey is not just food; it is a legacy.
        </p>
      </div>
    </div>
  );
};
