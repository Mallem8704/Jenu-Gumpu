package com.jenugumpu.app.data.database

import androidx.lifecycle.LiveData
import androidx.room.*
import com.jenugumpu.app.data.model.BatchEntry

/**
 * PRD §6.5: Batch Tracking Module
 * FR-5: App must generate batch IDs
 */
@Dao
interface BatchDao {
    @Query("SELECT * FROM batches ORDER BY timestamp DESC")
    fun getAllBatches(): LiveData<List<BatchEntry>>

    @Query("SELECT COUNT(*) FROM batches")
    suspend fun getBatchCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertBatch(batch: BatchEntry)

    @Delete
    suspend fun deleteBatch(batch: BatchEntry)
}
