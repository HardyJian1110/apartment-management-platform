package com.sky.controller.admin;

import com.sky.dto.BillPageQueryDTO;
import com.sky.result.PageResult;
import com.sky.result.Result;
import com.sky.service.BillService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/contract")
@Slf4j
public class BillController {

    @Autowired
    private BillService billService;

    @PostMapping("/getBillList")
    public Result<PageResult> page(@RequestBody BillPageQueryDTO billPageQueryDTO) {
        log.info("Get bill list：{}", billPageQueryDTO);
        PageResult pageResult = billService.pageQuery(billPageQueryDTO);
        return Result.success(pageResult);
    }

    @PostMapping("/batchDeleteBill")
    public Result<String> batchDelete(@RequestBody List<Long> ids) {
        log.info("Delete a batch of bills: {}", ids);
        billService.deleteBatch(ids);
        return Result.success("Delete successfully");
    }
}