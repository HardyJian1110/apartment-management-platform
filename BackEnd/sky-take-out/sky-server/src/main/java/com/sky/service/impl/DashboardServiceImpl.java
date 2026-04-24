package com.sky.service.impl;

import com.sky.mapper.DashboardMapper;
import com.sky.service.DashboardService;
import com.sky.vo.DashboardEnergyVO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private DashboardMapper dashboardMapper;

    @Override
    public List<DashboardEnergyVO> getEnergyData() {
        List<DashboardEnergyVO> energyData= dashboardMapper.getEnergyData();
        return energyData;
    }
}
