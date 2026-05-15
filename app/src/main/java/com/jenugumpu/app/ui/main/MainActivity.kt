package com.jenugumpu.app.ui.main

import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import androidx.navigation.fragment.NavHostFragment
import androidx.navigation.ui.setupWithNavController
import com.jenugumpu.app.R
import com.jenugumpu.app.databinding.ActivityMainBinding

/**
 * PRD §13 Screen 3: Dashboard — Main navigation
 * Single Activity hosting all fragments via Navigation Component
 * Bottom Navigation: Dashboard | Harvest | Grading | Stock | Profit
 * Analytics & Settings accessed via bottom nav overflow
 */
class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        // Setup Navigation Component with Bottom Navigation
        val navHostFragment = supportFragmentManager
            .findFragmentById(R.id.nav_host_fragment) as NavHostFragment
        val navController = navHostFragment.navController
        binding.bottomNav.setupWithNavController(navController)
    }
}
