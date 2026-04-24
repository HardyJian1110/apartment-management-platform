package com.sky.controller.admin;

import com.sky.dto.ContractPageQueryDTO;
import com.sky.entity.Contract;
import com.sky.result.PageResult;
import com.sky.result.Result;
import com.sky.service.ContractService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/contract")
@Slf4j
public class ContractController {
    @Autowired
    private ContractService contractService;

    @PostMapping("/getContractList")
    public Result<PageResult> getContractList(@RequestBody ContractPageQueryDTO dto) {
        return Result.success(contractService.getContractList(dto));
    }

    @GetMapping("/detail/{contractNo}")
    public Result<Contract> getDetail(@PathVariable String contractNo) {
        return Result.success(contractService.getByNo(contractNo));
    }
}