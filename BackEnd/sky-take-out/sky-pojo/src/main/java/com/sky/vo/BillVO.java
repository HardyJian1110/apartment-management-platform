package com.sky.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class BillVO implements Serializable {
    private Long id;
    private String accountNo;
    private Integer status;
    private String roomNo;
    private String carNo;
    private String tel;
    private BigDecimal costName1;
    private BigDecimal costName2;
    private BigDecimal costName3;

    @JsonFormat(pattern = "dd/MM/yyyy") // 返回意大利习惯：日/月/年
    private LocalDate startDate;

    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate endDate;

    private BigDecimal preferential;
    private BigDecimal money;
    private String pay;
}
