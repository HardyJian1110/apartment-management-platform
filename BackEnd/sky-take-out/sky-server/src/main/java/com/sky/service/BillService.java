package com.sky.service;

import com.sky.dto.BillPageQueryDTO;
import com.sky.result.PageResult;

import java.util.List;

public interface BillService {
    PageResult pageQuery(BillPageQueryDTO billPageQueryDTO);

    void deleteBatch(List<Long> ids);
}
