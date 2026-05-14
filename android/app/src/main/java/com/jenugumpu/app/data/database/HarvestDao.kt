package com.jenugumpu.app.data.database

import androidx.lifecycle.LiveData
import androidx.room.*
import com.jenugumpu.app.data.model.Harvest

/**
 * PRD FR-2: User must add harvest logs
 * PRD FR-4: App must store data offline (Room DB)
 */
@Dao
interface HarvestDao {
    @Query("SELECT * FROM harvests ORDER BY timestamp DESC")
    fun getAllHarvests(): LiveData<List<Harvest>>

    @Query("SELECT * FROM harvests ORDER BY timestamp DESC")
    suspend fun getAllHarvestsOnce(): List<Harvest>

    @Query("SELECT SUM(quantity) FROM harvests")
    fun getTotalStock(): LiveData<Double?>

    @Query("SELECT COUNT(*) FROM harvests")
    suspend fun getHarvestCount(): Int

    @Insert(onConflict = OnConflictStrategy.REPLACE)
    suspend fun insertHarvest(harvest: Harvest): Long

    @Update
    suspend fun updateHarvest(harvest: Harvest)

    @Delete
    suspend fun deleteHarvest(harvest: Harvest)

    @Query("DELETE FROM harvests")
    suspend fun deleteAll()

    // Analytics: monthly collection
    @Query("""
        SELECT strftime('%m', datetime(timestamp/1000, 'unixepoch')) as month, 
               SUM(quantity) as totalQty 
        FROM harvests 
        GROUP BY month 
        ORDER BY month
    """)
    suspend fun getMonthlyCollection(): List<MonthlyData>

    // Analytics: by floral source
    @Query("SELECT floralSource, SUM(quantity) as totalQty FROM harvests GROUP BY floralSource")
    suspend fun getFloralBreakdown(): List<FloralData>
}

data class MonthlyData(val month: String, val totalQty: Double)
data class FloralData(val floralSource: String, val totalQty: Double)
