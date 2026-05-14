package com.jenugumpu.app.ui.profit

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import com.jenugumpu.app.databinding.FragmentProfitBinding
import com.jenugumpu.app.utils.GradingUtils
import com.jenugumpu.app.viewmodel.HarvestViewModel

/**
 * PRD §6.6 — Profit Calculator
 */
class ProfitFragment : Fragment() {

    private var _binding: FragmentProfitBinding? = null
    private val binding get() = _binding!!
    private val viewModel: HarvestViewModel by activityViewModels()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentProfitBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Set default quantity from total stock
        viewModel.totalStock.observe(viewLifecycleOwner) { stock ->
            if (binding.etQty.text.isNullOrEmpty()) {
                binding.etQty.setText("%.1f".format(stock ?: 0.0))
            }
        }

        binding.btnCalculate.setOnClickListener {
            calculate()
        }
    }

    private fun calculate() {
        val qty = binding.etQty.text.toString().toDoubleOrNull() ?: 0.0
        val retail = binding.etRetail.text.toString().toDoubleOrNull() ?: 0.0
        val wholesale = binding.etWholesale.text.toString().toDoubleOrNull() ?: 0.0
        val filter = binding.etFilterCost.text.toString().toDoubleOrNull() ?: 0.0

        if (qty > 0) {
            val profit = GradingUtils.calculateProfit(qty, retail, wholesale, filter)
            binding.cardProfitResult.visibility = View.VISIBLE
            binding.tvProfitResult.text = "₹%.0f".format(profit)
            
            // Color based on profit/loss
            val color = if (profit >= 0) {
                android.graphics.Color.parseColor("#4CAF50")
            } else {
                android.graphics.Color.parseColor("#EF4444")
            }
            binding.tvProfitResult.setTextColor(color)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
