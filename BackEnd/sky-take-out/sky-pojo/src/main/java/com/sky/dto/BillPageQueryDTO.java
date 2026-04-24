package com.sky.dto;

import lombok.Data;
import org.apache.xmlbeans.impl.xb.xsdschema.ListDocument;
import org.springframework.format.annotation.DateTimeFormat;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.List;

@Data
public class BillPageQueryDTO implements Serializable {
    private int page;
    private int pageSize;
    private String no;
    private String status;

    // 直接接收前端传来的 startDate 和 endDate 字符串
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate startDate;

    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate endDate;
}