package com.jenugumpu.app.ui.settings

import android.content.Context
import android.content.Intent
import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import com.jenugumpu.app.databinding.FragmentSettingsBinding
import com.jenugumpu.app.ui.auth.LoginActivity
import com.jenugumpu.app.utils.Constants

/**
 * PRD §6.9 — Settings & Language
 */
class SettingsFragment : Fragment() {

    private var _binding: FragmentSettingsBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentSettingsBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        loadProfile()
        setupLanguageToggle()

        binding.btnLogout.setOnClickListener {
            logout()
        }
    }

    private fun loadProfile() {
        val prefs = requireActivity().getSharedPreferences(Constants.PREFS_NAME, Context.MODE_PRIVATE)
        val name = prefs.getString(Constants.KEY_USERNAME, "Farmer") ?: "Farmer"
        binding.tvUsername.text = name
        binding.tvPhone.text = "+91 " + prefs.getString(Constants.KEY_PHONE, "0000000000")
        binding.tvAvatar.text = name.first().toString().uppercase()
    }

    private fun setupLanguageToggle() {
        val prefs = requireActivity().getSharedPreferences(Constants.PREFS_NAME, Context.MODE_PRIVATE)
        val lang = prefs.getString(Constants.KEY_LANGUAGE, Constants.LANG_ENGLISH)
        
        if (lang == Constants.LANG_KANNADA) {
            binding.toggleLanguage.check(binding.btnKannada.id)
        } else {
            binding.toggleLanguage.check(binding.btnEnglish.id)
        }

        binding.toggleLanguage.addOnButtonCheckedListener { _, checkedId, isChecked ->
            if (isChecked) {
                val newLang = if (checkedId == binding.btnKannada.id) Constants.LANG_KANNADA else Constants.LANG_ENGLISH
                prefs.edit().putString(Constants.KEY_LANGUAGE, newLang).apply()
                // In a real app, you would recreate the activity to apply locale
                android.widget.Toast.makeText(requireContext(), "Language changed to $newLang", android.widget.Toast.LENGTH_SHORT).show()
            }
        }
    }

    private fun logout() {
        val prefs = requireActivity().getSharedPreferences(Constants.PREFS_NAME, Context.MODE_PRIVATE)
        prefs.edit().clear().apply()
        startActivity(Intent(requireActivity(), LoginActivity::class.java))
        requireActivity().finish()
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
