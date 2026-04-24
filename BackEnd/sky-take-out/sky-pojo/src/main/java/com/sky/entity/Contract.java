package com.sky.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Contract implements Serializable {
    private Long id;
    private Integer contractNo;
    private String type;
    private String name;
    private String startDate;
    private String endDate;
    private String partyA;
    private String partyB;
    private Integer status;
    private String rejectionReason;
    private String tel;
    private String additionalTerms;
}