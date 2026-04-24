package com.sky.mapper;

import com.github.pagehelper.Page;
import com.sky.dto.ContractPageQueryDTO;
import com.sky.entity.Contract;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface ContractMapper {
    Page<Contract> pageQuery(ContractPageQueryDTO dto);

    @Select("SELECT * FROM contract WHERE contract_no = #{contractNo}")
    Contract getByNo(String contractNo);
}
