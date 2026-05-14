package com.jenugumpu.app.ui.stock

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import com.jenugumpu.app.databinding.FragmentStockBinding
import com.jenugumpu.app.ui.harvest.HarvestAdapter
import com.jenugumpu.app.viewmodel.HarvestViewModel

/**
 * PRD §6.4 — Stock Screen
 */
class StockFragment : Fragment() {

    private var _binding: FragmentStockBinding? = null
    private val binding get() = _binding!!
    private val viewModel: HarvestViewModel by activityViewModels()
    private lateinit var adapter: HarvestAdapter

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentStockBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        observeData()
    }

    private fun setupRecyclerView() {
        adapter = HarvestAdapter { /* No delete from stock screen */ }
        binding.rvBatches.adapter = adapter
    }

    private fun observeData() {
        viewModel.totalStock.observe(viewLifecycleOwner) { stock ->
            binding.tvTotalStock.text = "%.1f".format(stock ?: 0.0)
        }

        viewModel.allHarvests.observe(viewLifecycleOwner) { list ->
            adapter.submitList(list)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
