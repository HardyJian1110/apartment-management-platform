package com.sky.mapper;

import com.github.pagehelper.Page;
import com.sky.dto.BuildingPageQueryDTO;
import com.sky.entity.Building;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BuildingMapper {
    Page<Building> pageQuery(BuildingPageQueryDTO buildingPageQueryDTO);

    void deleteByIds(List<Long> ids);
}
