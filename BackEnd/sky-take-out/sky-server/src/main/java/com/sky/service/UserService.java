package com.sky.service;

import com.sky.dto.UserListPageQueryDTO;
import com.sky.entity.User;
import com.sky.result.PageResult;

import java.util.List;

public interface UserService {
    PageResult pageQuery(UserListPageQueryDTO userListPageQueryDTO);

    void batchDeleteUser(List<Long> ids);

    void editOrAddUser(User user);
}
