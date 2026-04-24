package com.sky.service;

import com.sky.dto.ContractPageQueryDTO;
import com.sky.entity.Contract;
import com.sky.result.PageResult;

public interface ContractService {
    PageResult getContractList(ContractPageQueryDTO dto);

    Contract getByNo(String contractNo);
}
