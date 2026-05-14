package com.jenugumpu.app.ui.harvest

import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.DiffUtil
import androidx.recyclerview.widget.ListAdapter
import androidx.recyclerview.widget.RecyclerView
import com.jenugumpu.app.data.model.Harvest
import com.jenugumpu.app.databinding.ItemHarvestBinding
import com.jenugumpu.app.utils.GradingUtils

/**
 * RecyclerView Adapter for harvest entries (PRD: use RecyclerView for dynamic lists)
 */
class HarvestAdapter(
    private val onDelete: (Harvest) -> Unit
) : ListAdapter<Harvest, HarvestAdapter.HarvestViewHolder>(DiffCallback) {

    inner class HarvestViewHolder(private val binding: ItemHarvestBinding) :
        RecyclerView.ViewHolder(binding.root) {

        fun bind(harvest: Harvest) {
            binding.tvFloralSource.text = harvest.floralSource
            binding.tvLocation.text = harvest.location
            binding.tvDate.text = harvest.date
            binding.tvQuantity.text = "${harvest.quantity} kg"
            binding.tvMoisture.text = "${harvest.moisture}%"

            // Grade badge with color
            val gradeLabel = GradingUtils.getGradeLabel(harvest.grade)
            val gradeColor = GradingUtils.getGradeColor(harvest.grade)
            binding.tvGrade.text = gradeLabel
            binding.tvGrade.setTextColor(gradeColor)
            binding.cardGradeBadge.setCardBackgroundColor(gradeColor and 0x22FFFFFF)

            binding.btnDelete.setOnClickListener { onDelete(harvest) }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): HarvestViewHolder {
        val binding = ItemHarvestBinding.inflate(LayoutInflater.from(parent.context), parent, false)
        return HarvestViewHolder(binding)
    }

    override fun onBindViewHolder(holder: HarvestViewHolder, position: Int) {
        holder.bind(getItem(position))
    }

    companion object DiffCallback : DiffUtil.ItemCallback<Harvest>() {
        override fun areItemsTheSame(oldItem: Harvest, newItem: Harvest) = oldItem.id == newItem.id
        override fun areContentsTheSame(oldItem: Harvest, newItem: Harvest) = oldItem == newItem
    }
}
