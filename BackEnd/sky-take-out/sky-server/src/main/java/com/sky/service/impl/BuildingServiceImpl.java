package com.sky.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.sky.dto.BuildingPageQueryDTO;
import com.sky.entity.Building;
import com.sky.mapper.BuildingMapper;
import com.sky.result.PageResult;
import com.sky.service.BuildingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BuildingServiceImpl implements BuildingService {
    @Autowired
    private BuildingMapper buildingMapper;
    @Override
    public PageResult pageQuery(BuildingPageQueryDTO buildingPageQueryDTO) {

        PageHelper.startPage(buildingPageQueryDTO.getPage(), buildingPageQueryDTO.getPageSize());
        Page<Building> page = buildingMapper.pageQuery(buildingPageQueryDTO);
        return new PageResult(page.getTotal(), page.getResult());

    }

    @Override
    public void deleteBatch(List<Long> ids) {
        buildingMapper.deleteByIds(ids);
    }
}
