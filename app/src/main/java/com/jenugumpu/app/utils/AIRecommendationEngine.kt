package com.jenugumpu.app.utils

/**
 * PRD §6.8 — GenAI Recommendation System
 * Simulates Gemini API: returns context-aware advice based on
 * floralSource × moisture grade × quantity
 *
 * In production, replace generateRecommendation() with actual
 * Gemini API call using the generativeai SDK.
 */
object AIRecommendationEngine {

    fun generateRecommendation(
        floralSource: String,
        moisture: Float,
        quantity: Double,
        isKannada: Boolean = false
    ): String {
        val grade = GradingUtils.getGrade(moisture)
        val qty = "%.1f".format(quantity)
        val src = floralSource

        return if (isKannada) {
            getKannadaRecommendation(src, grade, moisture, qty)
        } else {
            getEnglishRecommendation(src, grade, moisture, qty)
        }
    }

    private fun getEnglishRecommendation(src: String, grade: String, moisture: Float, qty: String): String {
        return when (grade) {
            GradingUtils.GRADE_PREMIUM -> when (src) {
                "Coffee Blossom" ->
                    "🌟 PREMIUM GRADE — Your Coffee Blossom honey ($qty kg) at ${moisture}% moisture is exceptional. " +
                    "This rare variety commands ₹800–1000/kg in specialty stores. " +
                    "Store in sealed glass jars at 15–25°C. " +
                    "Target: Bengaluru/Mysuru artisan food stores and Ayurvedic distributors."
                "Forest Honey" ->
                    "🌟 PREMIUM GRADE — Pure Forest Honey ($qty kg) at ${moisture}% moisture. " +
                    "Highly sought-after by urban consumers. Market as 'Wild Tribal Honey'. " +
                    "Suggested retail: ₹900–1100/kg. " +
                    "Contact organic food stores for direct partnership."
                "Neem" ->
                    "🌟 PREMIUM GRADE — Neem Honey ($qty kg) at ${moisture}% moisture has unique medicinal value. " +
                    "Market as 'Forest Medicine Honey' to Ayurvedic distributors. " +
                    "Price: ₹900–1200/kg."
                "Wildflower" ->
                    "🌟 PREMIUM GRADE — Wildflower Honey ($qty kg) at ${moisture}%. " +
                    "In high demand for Ayurvedic and wellness markets. " +
                    "Suggested retail: ₹750–900/kg. Target health food stores."
                "Sunflower" ->
                    "🌟 PREMIUM GRADE — Sunflower Honey ($qty kg) at ${moisture}%. " +
                    "Note: crystallizes quickly — store sealed. " +
                    "Excellent for bakeries and sweet shops. Price: ₹600–750/kg."
                else ->
                    "🌟 PREMIUM GRADE — Your honey ($qty kg) at ${moisture}% is excellent quality. " +
                    "Store in glass jars and target retail markets."
            }
            GradingUtils.GRADE_STANDARD -> when (src) {
                "Coffee Blossom" ->
                    "⭐ STANDARD GRADE — Coffee Blossom Honey ($qty kg) at ${moisture}%. " +
                    "Filter to reduce moisture below 18% to reach Premium. " +
                    "Current wholesale value: ₹450–600/kg."
                "Forest Honey" ->
                    "⭐ STANDARD GRADE — Forest Honey ($qty kg) at ${moisture}%. " +
                    "Sell quickly to cooperative buyers at ₹400–500/kg. " +
                    "Dehumidification can upgrade to Premium grade."
                else ->
                    "⭐ STANDARD GRADE — Your $src honey ($qty kg) at ${moisture}%. " +
                    "Suitable for local cooperative sales at ₹400–600/kg. " +
                    "Reduce moisture below 18% to increase value."
            }
            else -> when (src) {
                "Coffee Blossom" ->
                    "⚠️ LOW GRADE — Coffee Blossom Honey ($qty kg) at ${moisture}%. " +
                    "HIGH FERMENTATION RISK. Process immediately! " +
                    "Heat gently to 40°C to reduce moisture, or consider mead production."
                "Forest Honey" ->
                    "⚠️ LOW GRADE — Forest Honey ($qty kg) at ${moisture}% is at risk. " +
                    "Likely harvested early. Contact a cooperative for processing support. " +
                    "Do NOT store long-term."
                else ->
                    "⚠️ LOW GRADE — $src honey ($qty kg) at ${moisture}%. " +
                    "Immediate action needed. Process or sell at ₹150–250/kg for industrial use. " +
                    "Avoid storing."
            }
        }
    }

    private fun getKannadaRecommendation(src: String, grade: String, moisture: Float, qty: String): String {
        return when (grade) {
            GradingUtils.GRADE_PREMIUM ->
                "🌟 ಪ್ರೀಮಿಯಂ ಶ್ರೇಣಿ — ನಿಮ್ಮ $src ಜೇನುತುಪ್ಪ ($qty ಕೆಜಿ) ${moisture}% ತೇವಾಂಶದಲ್ಲಿ ಅತ್ಯುತ್ತಮ ಗುಣಮಟ್ಟ. " +
                "ವಿಶೇಷ ಮಳಿಗೆಗಳಲ್ಲಿ ₹800–1000/ಕೆಜಿ ಬೆಲೆ ಪಡೆಯಬಹುದು. " +
                "ಗಾಜಿನ ಜಾಡಿಗಳಲ್ಲಿ 15–25°C ಗೆ ಸಂಗ್ರಹಿಸಿ."
            GradingUtils.GRADE_STANDARD ->
                "⭐ ಸ್ಟ್ಯಾಂಡರ್ಡ್ ಶ್ರೇಣಿ — ನಿಮ್ಮ $src ಜೇನು ($qty ಕೆಜಿ) ${moisture}% ತೇವಾಂಶ. " +
                "ತೇವಾಂಶ 18% ಕ್ಕಿಂತ ಕಡಿಮೆ ಮಾಡಿ ಪ್ರೀಮಿಯಂ ಶ್ರೇಣಿ ತಲುಪಿ. " +
                "ಸದ್ಯ ₹400–600/ಕೆಜಿ."
            else ->
                "⚠️ ಕಡಿಮೆ ಶ್ರೇಣಿ — ನಿಮ್ಮ $src ಜೇನು ($qty ಕೆಜಿ) ${moisture}% ತೇವಾಂಶ ತುಂಬಾ ಹೆಚ್ಚಾಗಿದೆ. " +
                "ಹುದುಗುವಿಕೆ ಅಪಾಯ ಇದೆ. ತಕ್ಷಣ ಸಂಸ್ಕರಿಸಿ. " +
                "ದೀರ್ಘಕಾಲ ಸಂಗ್ರಹಿಸಬೇಡಿ."
        }
    }
}
