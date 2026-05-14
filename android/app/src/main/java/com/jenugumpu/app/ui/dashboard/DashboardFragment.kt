package com.jenugumpu.app.ui.dashboard

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import androidx.navigation.fragment.findNavController
import com.jenugumpu.app.R
import com.jenugumpu.app.databinding.FragmentDashboardBinding
import com.jenugumpu.app.utils.Constants
import com.jenugumpu.app.viewmodel.HarvestViewModel

/**
 * PRD §13 Screen 3: Dashboard — Main navigation hub
 * Shows: Collective Stock, Total Earnings, quick action cards
 */
class DashboardFragment : Fragment() {

    private var _binding: FragmentDashboardBinding? = null
    private val binding get() = _binding!!
    private val viewModel: HarvestViewModel by activityViewModels()

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentDashboardBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupWelcome()
        observeData()
        setupQuickActions()
    }

    private fun setupWelcome() {
        val prefs = requireActivity().getSharedPreferences(Constants.PREFS_NAME, android.content.Context.MODE_PRIVATE)
        val username = prefs.getString(Constants.KEY_USERNAME, "Farmer") ?: "Farmer"
        binding.tvWelcome.text = getString(R.string.welcome_user, username)
    }

    private fun observeData() {
        // PRD §6.4: Total Collective Stock
        viewModel.totalStock.observe(viewLifecycleOwner) { stock ->
            val total = stock ?: 0.0
            binding.tvCollectiveStock.text = getString(R.string.stock_kg, "%.1f".format(total))
            val earnings = (total * Constants.RETAIL_PRICE_DEFAULT).toLong()
            binding.tvTotalEarnings.text = getString(R.string.rupee_amount, earnings.toString())
        }

        viewModel.allHarvests.observe(viewLifecycleOwner) { harvests ->
            binding.tvHarvestCount.text = "${harvests.size} ${getString(R.string.entries)}"
        }
    }

    private fun setupQuickActions() {
        binding.cardHarvest.setOnClickListener {
            findNavController().navigate(R.id.action_dashboard_to_harvest)
        }
        binding.cardGrading.setOnClickListener {
            findNavController().navigate(R.id.action_dashboard_to_grading)
        }
        binding.cardStock.setOnClickListener {
            findNavController().navigate(R.id.action_dashboard_to_stock)
        }
        binding.cardProfit.setOnClickListener {
            findNavController().navigate(R.id.action_dashboard_to_profit)
        }
        binding.cardAnalytics.setOnClickListener {
            findNavController().navigate(R.id.action_dashboard_to_analytics)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
