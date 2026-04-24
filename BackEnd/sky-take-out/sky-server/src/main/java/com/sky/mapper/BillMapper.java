package com.sky.mapper;

import com.github.pagehelper.Page;
import com.sky.dto.BillPageQueryDTO;
import com.sky.vo.BillVO;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BillMapper {
    Page<BillVO> pageQuery(BillPageQueryDTO dto);

    void deleteBatch(List<Long> ids);
}
