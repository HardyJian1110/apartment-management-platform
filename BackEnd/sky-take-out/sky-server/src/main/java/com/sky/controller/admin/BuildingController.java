package com.sky.controller.admin;

import com.sky.dto.BuildingPageQueryDTO;
import com.sky.result.PageResult;
import com.sky.result.Result;
import com.sky.service.BuildingService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/estate")
@Slf4j
public class BuildingController {

    @Autowired
    private BuildingService buildingService;

    @PostMapping("/getBuildingList")
    public Result<PageResult> page(@RequestBody BuildingPageQueryDTO buildingPageQueryDTO) {
        log.info("Get building list：{}", buildingPageQueryDTO);
        PageResult pageResult = buildingService.pageQuery(buildingPageQueryDTO);
        return Result.success(pageResult);
    }

    @PostMapping("/batchDeleteBuilding")
    public Result delete(@RequestBody List<Long> ids) {
        log.info("Delete a batch of building，ids：{}", ids);
        buildingService.deleteBatch(ids);
        return Result.success("Delete Successful");
    }
}