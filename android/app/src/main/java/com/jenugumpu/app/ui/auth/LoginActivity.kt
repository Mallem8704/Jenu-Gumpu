package com.jenugumpu.app.ui.auth

import android.content.Intent
import android.os.Bundle
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import com.jenugumpu.app.databinding.ActivityLoginBinding
import com.jenugumpu.app.ui.main.MainActivity
import com.jenugumpu.app.utils.Constants

/**
 * PRD §6.1 — User Authentication
 * FR-1: User must register/login
 * Inputs: Username + Phone Number
 * Offline user persistence via SharedPreferences
 */
class LoginActivity : AppCompatActivity() {

    private lateinit var binding: ActivityLoginBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityLoginBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
    }

    private fun setupUI() {
        binding.btnContinue.setOnClickListener {
            val username = binding.etUsername.text.toString().trim()
            val phone    = binding.etPhone.text.toString().trim()

            when {
                username.isEmpty() -> {
                    binding.etUsername.error = "Username is required"
                }
                phone.length != 10 || !phone.all { it.isDigit() } -> {
                    binding.etPhone.error = "Enter a valid 10-digit mobile number"
                }
                else -> saveUserAndProceed(username, phone)
            }
        }
    }

    private fun saveUserAndProceed(username: String, phone: String) {
        // Offline user persistence (PRD FR-4)
        val prefs = getSharedPreferences(Constants.PREFS_NAME, MODE_PRIVATE)
        prefs.edit()
            .putString(Constants.KEY_USERNAME, username)
            .putString(Constants.KEY_PHONE, phone)
            .putBoolean(Constants.KEY_IS_LOGGED_IN, true)
            .apply()

        startActivity(Intent(this, MainActivity::class.java))
        finish()
    }
}
