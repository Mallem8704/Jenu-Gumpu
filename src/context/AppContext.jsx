import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../constants/translations';

const AppContext = createContext();

// PRD Grading Logic: <18% = Premium, 18-22% = Standard, >22% = Low Grade
export const getGrade = (moisture) => {
  const m = parseFloat(moisture);
  if (m < 18) return 'premium';
  if (m <= 22) return 'standard';
  return 'low';
};

// PRD Profit Formula: Profit = (Retail Price - Cost Price) × Quantity - Filtering Cost
export const calcProfit = (qty, retail, wholesale, filterCost) => {
  return (retail - wholesale) * qty - (filterCost * qty);
};

// PRD Batch ID: JG-YYYY-XXX (sequential)
const generateBatchId = (index) => {
  const year = new Date().getFullYear();
  const seq = String(index + 1).padStart(3, '0');
  return `JG-${year}-${seq}`;
};

// PRD GenAI Recommendation System (simulated Gemini API)
export const getAIRecommendation = (floralSource, moisture, quantity, lang) => {
  const grade = getGrade(moisture);
  const recommendations = {
    en: {
      premium: {
        coffee: `Your Coffee Blossom honey (${quantity}kg) scores Premium grade at ${moisture}% moisture. This rare honey commands ₹800-1000/kg in specialty markets. Store in sealed glass jars at 15-25°C. Contact artisan food stores in Bengaluru and Mysuru for direct retail partnerships.`,
        wildflower: `Excellent! Your Wildflower honey (${quantity}kg) is Premium grade at ${moisture}% moisture. Wildflower honey is in high demand for Ayurvedic use. Target health food stores and yoga centers. Suggested retail: ₹750-900/kg.`,
        neem: `Your Neem honey (${quantity}kg) at ${moisture}% moisture is Premium quality with unique medicinal properties. This is rare — market it as "Forest Medicine Honey" for ₹900-1200/kg to Ayurvedic distributors.`,
        forest: `Outstanding! Pure Forest Honey (${quantity}kg) at ${moisture}% moisture — Premium grade. Forest honey is highly sought after by urban consumers. Market as "Wild Tribal Honey." Price: ₹900-1100/kg.`,
        sunflower: `Your Sunflower honey (${quantity}kg) at ${moisture}% moisture is Premium grade. Sunflower honey crystallizes quickly — store sealed. Excellent for bakeries and sweet shops. Price range: ₹600-750/kg.`
      },
      standard: {
        coffee: `Your Coffee Blossom honey (${quantity}kg) is Standard grade at ${moisture}% moisture. Consider filtering to reduce moisture below 18% to upgrade to Premium. Current value: ₹450-600/kg for wholesale buyers.`,
        wildflower: `Your Wildflower honey (${quantity}kg) at ${moisture}% moisture is Standard grade. Process through a dehumidifier or dry room to achieve Premium status. Suitable for local cooperative sales at ₹400-500/kg.`,
        neem: `Neem honey (${quantity}kg) at ${moisture}% moisture — Standard grade. Sell to local medicinal herb dealers. Reducing moisture will significantly boost value. Current price: ₹450-550/kg.`,
        forest: `Forest Honey (${quantity}kg) at ${moisture}% moisture is Standard. Harvest timing and processing can improve this. Sell quickly to avoid fermentation risk. Price: ₹400-500/kg.`,
        sunflower: `Sunflower honey (${quantity}kg) at ${moisture}% — Standard grade. Good for bulk buyers and candy manufacturers. Price: ₹350-450/kg.`
      },
      low: {
        coffee: `⚠️ Warning: Coffee Blossom honey (${quantity}kg) at ${moisture}% moisture is at risk of fermentation. Process immediately — filter, heat gently to 40°C to reduce moisture. Do NOT store long-term. Sell at discounted bulk price or use for fermented honey products.`,
        wildflower: `⚠️ Alert: Wildflower honey (${quantity}kg) at ${moisture}% moisture is Low Grade. Immediate action needed. Thin-film evaporation can help. Alternatively, use for mead production or value-added products like honey wine.`,
        neem: `⚠️ Neem honey (${quantity}kg) at ${moisture}% is Low Grade. Prioritize processing. Despite the grade, Neem honey retains medicinal value — market as raw medicinal honey at reduced price ₹200-300/kg.`,
        forest: `⚠️ Forest Honey (${quantity}kg) at ${moisture}% — Low Grade. Likely harvested too early. Process immediately. Consider contacting a local bee keeper cooperative for processing support.`,
        sunflower: `⚠️ Sunflower honey (${quantity}kg) at ${moisture}% — Low Grade. Use for industrial purposes or baking only. Price: ₹150-200/kg for bulk industrial buyers.`
      }
    },
    kn: {
      premium: {
        coffee: `ನಿಮ್ಮ ಕಾಫಿ ಹೂವಿನ ಜೇನು (${quantity}ಕೆಜಿ) ${moisture}% ತೇವಾಂಶದಲ್ಲಿ ಪ್ರೀಮಿಯಂ ಶ್ರೇಣಿ. ವಿಶೇಷ ಮಾರುಕಟ್ಟೆಯಲ್ಲಿ ₹800-1000/ಕೆಜಿ ಬೆಲೆ ಪಡೆಯಬಹುದು. ಗಾಜಿನ ಜಾಡಿಗಳಲ್ಲಿ 15-25°C ಗೆ ಸಂಗ್ರಹಿಸಿ.`,
        wildflower: `ಶ್ರೇಷ್ಠ! ನಿಮ್ಮ ಕಾಡುಹೂವಿನ ಜೇನು (${quantity}ಕೆಜಿ) ${moisture}% ತೇವಾಂಶದಲ್ಲಿ ಪ್ರೀಮಿಯಂ. ಆರೋಗ್ಯ ಅಂಗಡಿಗಳಿಗೆ ₹750-900/ಕೆಜಿ ಮಾರಿ.`,
        neem: `ನಿಮ್ಮ ಬೇವಿನ ಜೇನು (${quantity}ಕೆಜಿ) ಪ್ರೀಮಿಯಂ. ಔಷಧೀಯ ಗುಣಗಳಿಂದ ವಿಶೇಷ — ₹900-1200/ಕೆಜಿ ಆಯುರ್ವೇದ ವಿತರಕರಿಗೆ ಮಾರಿ.`,
        forest: `ಅದ್ಭುತ! ಶುದ್ಧ ಕಾಡು ಜೇನು (${quantity}ಕೆಜಿ) ಪ್ರೀಮಿಯಂ. "ಬುಡಕಟ್ಟು ಜೇನು" ಎಂದು ಮಾರ್ಕೆಟ್ ಮಾಡಿ ₹900-1100/ಕೆಜಿ.`,
        sunflower: `ನಿಮ್ಮ ಸೂರ್ಯಕಾಂತಿ ಜೇನು (${quantity}ಕೆಜಿ) ಪ್ರೀಮಿಯಂ. ಬೇಕರಿ ಮತ್ತು ಸಿಹಿ ಅಂಗಡಿಗಳಿಗೆ ₹600-750/ಕೆಜಿ.`
      },
      standard: {
        coffee: `ನಿಮ್ಮ ಕಾಫಿ ಜೇನು (${quantity}ಕೆಜಿ) ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಶ್ರೇಣಿ. ಪ್ರೀಮಿಯಂ ಶ್ರೇಣಿಗೆ ತೇವಾಂಶ 18% ಕಡಿಮೆ ಮಾಡಿ. ಸದ್ಯ ₹450-600/ಕೆಜಿ.`,
        wildflower: `ಕಾಡುಹೂವಿನ ಜೇನು (${quantity}ಕೆಜಿ) ಸ್ಟ್ಯಾಂಡರ್ಡ್. ಸಹಕಾರ ಮಾರಾಟ ₹400-500/ಕೆಜಿ.`,
        neem: `ಬೇವಿನ ಜೇನು (${quantity}ಕೆಜಿ) ಸ್ಟ್ಯಾಂಡರ್ಡ್. ಔಷಧ ವ್ಯಾಪಾರಿಗಳಿಗೆ ₹450-550/ಕೆಜಿ.`,
        forest: `ಕಾಡು ಜೇನು (${quantity}ಕೆಜಿ) ಸ್ಟ್ಯಾಂಡರ್ಡ್. ತ್ವರಿತ ಮಾರಾಟ ₹400-500/ಕೆಜಿ.`,
        sunflower: `ಸೂರ್ಯಕಾಂತಿ ಜೇನು (${quantity}ಕೆಜಿ) ಸ್ಟ್ಯಾಂಡರ್ಡ್. ಸಗಟು ₹350-450/ಕೆಜಿ.`
      },
      low: {
        coffee: `⚠️ ಎಚ್ಚರಿಕೆ: ಕಾಫಿ ಜೇನು (${quantity}ಕೆಜಿ) ${moisture}% ತೇವಾಂಶ — ಹುದುಗುವಿಕೆ ಅಪಾಯ. ತಕ್ಷಣ ಸಂಸ್ಕರಿಸಿ.`,
        wildflower: `⚠️ ಕಾಡುಹೂವಿನ ಜೇನು (${quantity}ಕೆಜಿ) ${moisture}% — ಕಡಿಮೆ ಶ್ರೇಣಿ. ತಕ್ಷಣ ಸಂಸ್ಕರಣೆ ಅಗತ್ಯ.`,
        neem: `⚠️ ಬೇವಿನ ಜೇನು (${quantity}ಕೆಜಿ) ${moisture}% — ಕಡಿಮೆ ಶ್ರೇಣಿ. ₹200-300/ಕೆಜಿ ಔಷಧೀಯ ಜೇನಾಗಿ ಮಾರಿ.`,
        forest: `⚠️ ಕಾಡು ಜೇನು (${quantity}ಕೆಜಿ) ${moisture}% — ಕಡಿಮೆ ಶ್ರೇಣಿ. ತಕ್ಷಣ ಸಂಸ್ಕರಿಸಿ.`,
        sunflower: `⚠️ ಸೂರ್ಯಕಾಂತಿ ಜೇನು (${quantity}ಕೆಜಿ) ${moisture}% — ಕಡಿಮೆ ಶ್ರೇಣಿ. ಕೈಗಾರಿಕಾ ₹150-200/ಕೆಜಿ.`
      }
    }
  };

  const sourceKey = {
    'Coffee Blossom': 'coffee', 'ಕಾಫಿ ಹೂವು': 'coffee',
    'Wildflower': 'wildflower', 'ಕಾಡುಹೂವು': 'wildflower',
    'Neem': 'neem', 'ಬೇವು': 'neem',
    'Forest Honey': 'forest', 'ಕಾಡು ಜೇನು': 'forest',
    'Sunflower': 'sunflower', 'ಸೂರ್ಯಕಾಂತಿ': 'sunflower'
  };
  
  const key = sourceKey[floralSource] || 'wildflower';
  return recommendations[lang]?.[grade]?.[key] || recommendations.en[grade][key];
};

export const AppProvider = ({ children }) => {
  const [lang, setLang] = useState('kn');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('jg_user');
    return saved ? JSON.parse(saved) : null;
  });
  const [harvests, setHarvests] = useState(() => {
    const saved = localStorage.getItem('jg_harvests');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('jg_harvests', JSON.stringify(harvests));
  }, [harvests]);

  useEffect(() => {
    if (user) localStorage.setItem('jg_user', JSON.stringify(user));
    else localStorage.removeItem('jg_user');
  }, [user]);

  const addHarvest = (entry) => {
    const idx = harvests.length;
    const newEntry = {
      ...entry,
      id: generateBatchId(idx),
      timestamp: new Date().toISOString(),
      grade: getGrade(entry.moisture || 20)
    };
    setHarvests(prev => [newEntry, ...prev]);
    return newEntry;
  };

  const deleteHarvest = (id) => {
    setHarvests(prev => prev.filter(h => h.id !== id));
  };

  const t = translations[lang];
  const collectiveStock = harvests.reduce((acc, h) => acc + parseFloat(h.quantity || 0), 0);

  return (
    <AppContext.Provider value={{
      lang, setLang,
      user, setUser,
      harvests, addHarvest, deleteHarvest,
      t, collectiveStock
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
