package com.sky.service;

import com.sky.vo.DashboardEnergyVO;

import java.util.List;

public interface DashboardService {
    List<DashboardEnergyVO> getEnergyData();
}
