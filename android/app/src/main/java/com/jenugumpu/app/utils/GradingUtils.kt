package com.jenugumpu.app.utils

/**
 * PRD §6.3 Grading Logic:
 *   <18%  → Premium
 *   18-22% → Standard
 *   >22%  → Low Grade
 */
object GradingUtils {

    const val GRADE_PREMIUM  = "premium"
    const val GRADE_STANDARD = "standard"
    const val GRADE_LOW      = "low"

    fun getGrade(moisture: Float): String = when {
        moisture < 18f  -> GRADE_PREMIUM
        moisture <= 22f -> GRADE_STANDARD
        else            -> GRADE_LOW
    }

    fun getGradeLabel(grade: String, isKannada: Boolean = false): String = when (grade) {
        GRADE_PREMIUM  -> if (isKannada) "ಪ್ರೀಮಿಯಂ"      else "Premium"
        GRADE_STANDARD -> if (isKannada) "ಸ್ಟ್ಯಾಂಡರ್ಡ್"   else "Standard"
        else           -> if (isKannada) "ಕಡಿಮೆ ಗ್ರೇಡ್"   else "Low Grade"
    }

    fun getGradeColor(grade: String): Int = when (grade) {
        GRADE_PREMIUM  -> android.graphics.Color.parseColor("#4CAF50")
        GRADE_STANDARD -> android.graphics.Color.parseColor("#FFB900")
        else           -> android.graphics.Color.parseColor("#EF4444")
    }

    /**
     * PRD §6.6 Profit Formula:
     * Profit = (Retail Price − Cost Price) × Quantity − Filtering Cost
     */
    fun calculateProfit(quantity: Double, retailPrice: Double, costPrice: Double, filteringCost: Double): Double {
        return (retailPrice - costPrice) * quantity - (filteringCost * quantity)
    }
}
