package com.sky.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class ContractPageQueryDTO implements Serializable {

    private String contractNo;
    private String person;
    private String tel;

    private int page;
    private int pageSize;
}