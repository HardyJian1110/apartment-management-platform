package com.sky.service.impl;


import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.sky.dto.ContractPageQueryDTO;
import com.sky.entity.Contract;
import com.sky.mapper.ContractMapper;
import com.sky.result.PageResult;
import com.sky.service.ContractService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContractServiceImpl implements ContractService {
    @Autowired
    private ContractMapper contractMapper;

    public PageResult getContractList(ContractPageQueryDTO dto) {
        PageHelper.startPage(dto.getPage(), dto.getPageSize());
        Page<Contract> page = contractMapper.pageQuery(dto);
        return new PageResult(page.getTotal(), page.getResult());
    }

    @Override
    public Contract getByNo(String contractNo) {
        return contractMapper.getByNo(contractNo);
    }
}
