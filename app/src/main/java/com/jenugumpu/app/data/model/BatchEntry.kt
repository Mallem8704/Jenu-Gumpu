package com.jenugumpu.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * PRD Section 10 — Batch Table
 * PRD §6.5: Batch ID format JG-YYYY-XXX
 */
@Entity(tableName = "batches")
data class BatchEntry(
    @PrimaryKey
    val batchId: String,       // JG-2026-001
    val moisture: Float,
    val grade: String,         // premium / standard / low
    val quantity: Double,
    val floralSource: String,
    val location: String,
    val date: String,
    val timestamp: Long = System.currentTimeMillis()
)
