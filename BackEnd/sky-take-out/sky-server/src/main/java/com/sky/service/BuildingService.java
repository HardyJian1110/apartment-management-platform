package com.sky.service;

import com.sky.dto.BuildingPageQueryDTO;
import com.sky.result.PageResult;

import java.util.List;

public interface BuildingService {
    PageResult pageQuery(BuildingPageQueryDTO buildingPageQueryDTO);

    void deleteBatch(List<Long> ids);
}
