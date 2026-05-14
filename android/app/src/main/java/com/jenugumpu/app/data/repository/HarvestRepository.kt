package com.jenugumpu.app.data.repository

import androidx.lifecycle.LiveData
import com.jenugumpu.app.data.database.BatchDao
import com.jenugumpu.app.data.database.FloralData
import com.jenugumpu.app.data.database.HarvestDao
import com.jenugumpu.app.data.database.MonthlyData
import com.jenugumpu.app.data.model.BatchEntry
import com.jenugumpu.app.data.model.Harvest
import com.jenugumpu.app.utils.Constants
import java.text.SimpleDateFormat
import java.util.*

/**
 * Repository: single source of truth between ViewModel and Room DB
 */
class HarvestRepository(
    private val harvestDao: HarvestDao,
    private val batchDao: BatchDao
) {

    val allHarvests: LiveData<List<Harvest>> = harvestDao.getAllHarvests()
    val totalStock: LiveData<Double?> = harvestDao.getTotalStock()
    val allBatches: LiveData<List<BatchEntry>> = batchDao.getAllBatches()

    /** Add harvest and auto-generate batch ID: JG-YYYY-XXX (PRD §6.5) */
    suspend fun addHarvest(harvest: Harvest) {
        val count = batchDao.getBatchCount()
        val year = Calendar.getInstance().get(Calendar.YEAR)
        val batchId = "JG-$year-${String.format("%03d", count + 1)}"

        // Insert harvest
        harvestDao.insertHarvest(harvest)

        // Insert corresponding batch entry
        val batch = BatchEntry(
            batchId = batchId,
            moisture = harvest.moisture,
            grade = harvest.grade,
            quantity = harvest.quantity,
            floralSource = harvest.floralSource,
            location = harvest.location,
            date = harvest.date
        )
        batchDao.insertBatch(batch)
    }

    suspend fun deleteHarvest(harvest: Harvest) = harvestDao.deleteHarvest(harvest)

    suspend fun getMonthlyCollection(): List<MonthlyData> = harvestDao.getMonthlyCollection()

    suspend fun getFloralBreakdown(): List<FloralData> = harvestDao.getFloralBreakdown()

    suspend fun getAllHarvestsOnce(): List<Harvest> = harvestDao.getAllHarvestsOnce()
}
