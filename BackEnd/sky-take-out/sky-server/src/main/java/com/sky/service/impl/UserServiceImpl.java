package com.sky.service.impl;

import com.github.pagehelper.Page;
import com.github.pagehelper.PageHelper;
import com.sky.dto.UserListPageQueryDTO;
import com.sky.entity.User;
import com.sky.mapper.UserMapper;
import com.sky.result.PageResult;
import com.sky.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public PageResult pageQuery(UserListPageQueryDTO userListPageQueryDTO) {
        PageHelper.startPage(userListPageQueryDTO.getPage(),userListPageQueryDTO.getPageSize());
        Page<User> page= userMapper.pageQuery(userListPageQueryDTO);
        return new PageResult(page.getTotal(),page.getResult());
    }

    @Override
    public void batchDeleteUser(List<Long> ids) {
        userMapper.batchDeleteUser(ids);
    }

    @Override
    public void editOrAddUser(User user) {
        // add a user
        if (user.getId() == null){
            userMapper.addUser(user);
        }else {
            userMapper.editUser(user);
        }
    }
}
