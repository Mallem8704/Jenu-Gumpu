package com.jenugumpu.app.data.database

import android.content.Context
import androidx.room.Database
import androidx.room.Room
import androidx.room.RoomDatabase
import com.jenugumpu.app.data.model.BatchEntry
import com.jenugumpu.app.data.model.Harvest

/**
 * PRD §9 Backend/Local Storage: Room Database + SQLite
 * Singleton Room Database — offline-first (FR-4)
 */
@Database(
    entities = [Harvest::class, BatchEntry::class],
    version = 1,
    exportSchema = false
)
abstract class AppDatabase : RoomDatabase() {

    abstract fun harvestDao(): HarvestDao
    abstract fun batchDao(): BatchDao

    companion object {
        @Volatile
        private var INSTANCE: AppDatabase? = null

        fun getDatabase(context: Context): AppDatabase {
            return INSTANCE ?: synchronized(this) {
                val instance = Room.databaseBuilder(
                    context.applicationContext,
                    AppDatabase::class.java,
                    "jenu_gumpu_database"
                ).build()
                INSTANCE = instance
                instance
            }
        }
    }
}
