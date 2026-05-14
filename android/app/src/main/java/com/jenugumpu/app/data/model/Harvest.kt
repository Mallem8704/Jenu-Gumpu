package com.jenugumpu.app.data.model

import androidx.room.Entity
import androidx.room.PrimaryKey

/**
 * PRD Section 10 — Harvest Table
 * Fields: id (Int), date (String), location (String), quantity (Double), floralSource (String)
 */
@Entity(tableName = "harvests")
data class Harvest(
    @PrimaryKey(autoGenerate = true)
    val id: Int = 0,
    val date: String,
    val location: String,
    val quantity: Double,
    val floralSource: String,  // PRD §6.2 floral source options
    val moisture: Float = 18f, // For grading
    val grade: String = "standard", // premium / standard / low
    val timestamp: Long = System.currentTimeMillis()
)
