package com.jenugumpu.app.ui.splash

import android.annotation.SuppressLint
import android.content.Intent
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.core.splashscreen.SplashScreen.Companion.installSplashScreen
import androidx.lifecycle.lifecycleScope
import com.jenugumpu.app.R
import com.jenugumpu.app.ui.auth.LoginActivity
import com.jenugumpu.app.ui.main.MainActivity
import com.jenugumpu.app.utils.Constants
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch

/**
 * PRD §13 Screen 1: Splash Screen — Branding
 */
@SuppressLint("CustomSplashScreen")
class SplashActivity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        installSplashScreen()
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_splash)

        lifecycleScope.launch {
            delay(2000) // Show splash for 2 seconds
            navigateNext()
        }
    }

    private fun navigateNext() {
        val prefs = getSharedPreferences(Constants.PREFS_NAME, MODE_PRIVATE)
        val isLoggedIn = prefs.getBoolean(Constants.KEY_IS_LOGGED_IN, false)

        val intent = if (isLoggedIn) {
            Intent(this, MainActivity::class.java)
        } else {
            Intent(this, LoginActivity::class.java)
        }
        startActivity(intent)
        finish()
    }
}
