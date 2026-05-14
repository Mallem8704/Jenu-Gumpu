package com.jenugumpu.app.viewmodel

import android.app.Application
import androidx.lifecycle.*
import com.jenugumpu.app.data.database.AppDatabase
import com.jenugumpu.app.data.database.FloralData
import com.jenugumpu.app.data.database.MonthlyData
import com.jenugumpu.app.data.model.Harvest
import com.jenugumpu.app.data.repository.HarvestRepository
import kotlinx.coroutines.launch

/**
 * Shared ViewModel for all fragments — MVVM pattern
 */
class HarvestViewModel(application: Application) : AndroidViewModel(application) {

    private val repository: HarvestRepository

    val allHarvests: LiveData<List<Harvest>>
    val totalStock: LiveData<Double?>

    private val _monthlyData = MutableLiveData<List<MonthlyData>>()
    val monthlyData: LiveData<List<MonthlyData>> = _monthlyData

    private val _floralData = MutableLiveData<List<FloralData>>()
    val floralData: LiveData<List<FloralData>> = _floralData

    private val _aiRecommendation = MutableLiveData<String>()
    val aiRecommendation: LiveData<String> = _aiRecommendation

    private val _isLoading = MutableLiveData<Boolean>(false)
    val isLoading: LiveData<Boolean> = _isLoading

    init {
        val db = AppDatabase.getDatabase(application)
        repository = HarvestRepository(db.harvestDao(), db.batchDao())
        allHarvests = repository.allHarvests
        totalStock = repository.totalStock
    }

    fun addHarvest(harvest: Harvest) = viewModelScope.launch {
        repository.addHarvest(harvest)
    }

    fun deleteHarvest(harvest: Harvest) = viewModelScope.launch {
        repository.deleteHarvest(harvest)
    }

    fun loadAnalytics() = viewModelScope.launch {
        _monthlyData.value = repository.getMonthlyCollection()
        _floralData.value = repository.getFloralBreakdown()
    }

    /** Generate AI recommendation (PRD §6.8) */
    fun generateAIRecommendation(
        floralSource: String,
        moisture: Float,
        quantity: Double,
        isKannada: Boolean
    ) {
        _isLoading.value = true
        viewModelScope.launch {
            // Simulate async Gemini API call
            kotlinx.coroutines.delay(1200)
            val result = com.jenugumpu.app.utils.AIRecommendationEngine.generateRecommendation(
                floralSource, moisture, quantity, isKannada
            )
            _aiRecommendation.value = result
            _isLoading.value = false
        }
    }
}
