package com.jenugumpu.app.ui.grading

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import com.jenugumpu.app.databinding.FragmentGradingBinding
import com.jenugumpu.app.utils.Constants
import com.jenugumpu.app.utils.GradingUtils
import com.jenugumpu.app.viewmodel.HarvestViewModel

/**
 * PRD §6.3 — Honey Grading Tool
 * PRD §6.8 — AI Recommendation System
 */
class GradingFragment : Fragment() {

    private var _binding: FragmentGradingBinding? = null
    private val binding get() = _binding!!
    private val viewModel: HarvestViewModel by activityViewModels()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentGradingBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupSpinner()
        observeAI()

        binding.btnCheck.setOnClickListener {
            val moisture = binding.etMoisture.text.toString().toFloatOrNull()
            if (moisture != null) {
                showResult(moisture)
            }
        }
    }

    private fun setupSpinner() {
        val adapter = ArrayAdapter(
            requireContext(),
            android.R.layout.simple_spinner_dropdown_item,
            Constants.FLORAL_SOURCES_EN
        )
        binding.spinnerFloral.adapter = adapter
    }

    private fun showResult(moisture: Float) {
        binding.cardResult.visibility = View.VISIBLE
        val grade = GradingUtils.getGrade(moisture)
        val color = GradingUtils.getGradeColor(grade)
        
        binding.tvResultGrade.text = GradingUtils.getGradeLabel(grade)
        binding.tvResultGrade.setTextColor(color)
        binding.tvStars.text = when(grade) {
            GradingUtils.GRADE_PREMIUM -> "⭐⭐⭐"
            GradingUtils.GRADE_STANDARD -> "⭐⭐"
            else -> "⭐"
        }
        binding.tvResultDesc.text = "$moisture% moisture — ${grade.replaceFirstChar { it.uppercase() }} quality."

        // Trigger AI Recommendation
        val floral = binding.spinnerFloral.selectedItem.toString()
        viewModel.generateAIRecommendation(floral, moisture, 10.0, false)
    }

    private fun observeAI() {
        viewModel.isLoading.observe(viewLifecycleOwner) { loading ->
            binding.pbAI.visibility = if (loading) View.VISIBLE else View.GONE
            binding.tvAIRecommendation.alpha = if (loading) 0.3f else 1.0f
        }

        viewModel.aiRecommendation.observe(viewLifecycleOwner) { recommendation ->
            binding.tvAIRecommendation.text = recommendation
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
