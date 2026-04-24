package com.sky.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class BuildingPageQueryDTO implements Serializable {
    private String name;
    private String person;
    private int page;
    private int pageSize;
}