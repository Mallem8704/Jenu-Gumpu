package com.jenugumpu.app.utils

/** App-wide constants */
object Constants {
    // SharedPreferences keys
    const val PREFS_NAME        = "jenu_gumpu_prefs"
    const val KEY_USERNAME      = "username"
    const val KEY_PHONE         = "phone"
    const val KEY_IS_LOGGED_IN  = "is_logged_in"
    const val KEY_LANGUAGE      = "language"

    // Language codes
    const val LANG_KANNADA  = "kn"
    const val LANG_ENGLISH  = "en"

    // PRD §6.2 Floral Sources (English keys for DB)
    val FLORAL_SOURCES_EN = listOf(
        "Coffee Blossom",
        "Wildflower",
        "Neem",
        "Forest Honey",
        "Sunflower"
    )

    // Market prices (§6.7)
    const val RETAIL_PRICE_DEFAULT     = 850.0   // ₹/kg Bengaluru retail
    const val WHOLESALE_PRICE_DEFAULT  = 350.0   // ₹/kg wholesale
    const val FILTERING_COST_DEFAULT   = 50.0    // ₹/kg

    // Gemini API key placeholder (replace with real key)
    const val GEMINI_API_KEY = "YOUR_GEMINI_API_KEY_HERE"
}
