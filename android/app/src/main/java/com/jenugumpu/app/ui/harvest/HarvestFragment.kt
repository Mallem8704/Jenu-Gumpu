package com.jenugumpu.app.ui.harvest

import android.os.Bundle
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.EditText
import androidx.appcompat.app.AlertDialog
import androidx.fragment.app.Fragment
import androidx.fragment.app.activityViewModels
import com.google.android.material.dialog.MaterialAlertDialogBuilder
import com.jenugumpu.app.R
import com.jenugumpu.app.data.model.Harvest
import com.jenugumpu.app.databinding.DialogAddHarvestBinding
import com.jenugumpu.app.databinding.FragmentHarvestBinding
import com.jenugumpu.app.utils.Constants
import com.jenugumpu.app.utils.GradingUtils
import com.jenugumpu.app.viewmodel.HarvestViewModel
import java.text.SimpleDateFormat
import java.util.*

/**
 * PRD §6.2 — Harvest Logging Screen
 */
class HarvestFragment : Fragment() {

    private var _binding: FragmentHarvestBinding? = null
    private val binding get() = _binding!!
    private val viewModel: HarvestViewModel by activityViewModels()
    private lateinit var adapter: HarvestAdapter

    override fun onCreateView(inflater: LayoutInflater, container: ViewGroup?, savedInstanceState: Bundle?): View {
        _binding = FragmentHarvestBinding.inflate(inflater, container, false)
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        setupRecyclerView()
        observeHarvests()

        binding.fabAdd.setOnClickListener {
            showAddHarvestDialog()
        }
    }

    private fun setupRecyclerView() {
        adapter = HarvestAdapter { harvest ->
            // Delete confirmation
            MaterialAlertDialogBuilder(requireContext())
                .setTitle("Delete Entry?")
                .setMessage("Are you sure you want to delete this harvest log?")
                .setNegativeButton("Cancel", null)
                .setPositiveButton("Delete") { _, _ ->
                    viewModel.deleteHarvest(harvest)
                }
                .show()
        }
        binding.rvHarvests.adapter = adapter
    }

    private fun observeHarvests() {
        viewModel.allHarvests.observe(viewLifecycleOwner) { list ->
            adapter.submitList(list)
        }
    }

    private fun showAddHarvestDialog() {
        val dialogBinding = DialogAddHarvestBinding.inflate(layoutInflater)
        
        // Setup floral source spinner (PRD §6.2)
        val spinnerAdapter = ArrayAdapter(
            requireContext(),
            android.R.layout.simple_spinner_dropdown_item,
            Constants.FLORAL_SOURCES_EN
        )
        dialogBinding.spinnerFloral.adapter = spinnerAdapter

        // Default date
        val sdf = SimpleDateFormat("yyyy-MM-dd", Locale.getDefault())
        dialogBinding.etDate.setText(sdf.format(Date()))

        MaterialAlertDialogBuilder(requireContext())
            .setTitle(getString(R.string.harvest))
            .setView(dialogBinding.root)
            .setNegativeButton(getString(R.string.cancel), null)
            .setPositiveButton(getString(R.string.save)) { _, _ ->
                saveHarvest(dialogBinding)
            }
            .show()
    }

    private fun saveHarvest(db: DialogAddHarvestBinding) {
        val qty = db.etQuantity.text.toString().toDoubleOrNull() ?: 0.0
        val moisture = db.etMoisture.text.toString().toFloatOrNull() ?: 18f
        val location = db.etLocation.text.toString()
        val date = db.etDate.text.toString()
        val floral = db.spinnerFloral.selectedItem.toString()

        if (qty > 0 && location.isNotEmpty()) {
            val grade = GradingUtils.getGrade(moisture)
            val harvest = Harvest(
                date = date,
                location = location,
                quantity = qty,
                floralSource = floral,
                moisture = moisture,
                grade = grade
            )
            viewModel.addHarvest(harvest)
        }
    }

    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
