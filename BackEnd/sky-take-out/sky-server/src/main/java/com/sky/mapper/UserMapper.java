package com.sky.mapper;

import com.github.pagehelper.Page;
import com.sky.dto.UserListPageQueryDTO;
import com.sky.entity.User;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface UserMapper {
    Page<User> pageQuery(UserListPageQueryDTO userListPageQueryDTO);

    void batchDeleteUser(List<Long> ids);

    void addUser(User user);

    void editUser(User user);
}
