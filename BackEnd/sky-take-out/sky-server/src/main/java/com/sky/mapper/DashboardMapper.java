package com.sky.mapper;

import com.sky.vo.DashboardEnergyVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface DashboardMapper {
    List<DashboardEnergyVO> getEnergyData();

}
