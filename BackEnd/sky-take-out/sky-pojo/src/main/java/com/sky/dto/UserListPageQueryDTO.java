package com.sky.dto;

import lombok.Data;

@Data
public class UserListPageQueryDTO {
    private String companyName;
    private String contact;
    private String phone;

    private int page;
    private int pageSize;
}
