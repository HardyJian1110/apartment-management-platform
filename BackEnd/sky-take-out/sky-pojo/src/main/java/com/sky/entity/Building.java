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
public class Building implements Serializable {
    private Long id;
    private String name;
    private String person;
    private String tel;
    private Integer status; // 1, 2, 3
    private Double vacancyRate;
    private String propertyFee; // "3.5%"
}