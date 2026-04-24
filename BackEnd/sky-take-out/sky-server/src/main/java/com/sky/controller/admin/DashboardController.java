package com.sky.controller.admin;

import com.sky.result.Result;
import com.sky.service.DashboardService;
import com.sky.vo.DashboardEnergyVO;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/dashboard")
@Slf4j
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/energyData")
    public Result<List<DashboardEnergyVO>> getEnergyData() {
        log.info("Get energy data");
        List<DashboardEnergyVO> energyData = dashboardService.getEnergyData();
        return Result.success(energyData);
    }
}
