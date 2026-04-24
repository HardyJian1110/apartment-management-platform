package com.sky.controller.admin;

import com.sky.dto.UserListPageQueryDTO;
import com.sky.entity.User;
import com.sky.result.PageResult;
import com.sky.result.Result;
import com.sky.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/user")
@Slf4j
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/userList")
    public Result<PageResult> getUserList(@RequestBody UserListPageQueryDTO userListPageQueryDTO){
        log.info("User page query: {}", userListPageQueryDTO);
        PageResult pageResult = userService.pageQuery(userListPageQueryDTO);
//        log.info("!!!!!!!!!!!!!!!!!!!! {}",pageResult.getList());
        return  Result.success(pageResult);
    }

    @PostMapping("/batchDeleteUser")
    public Result batchDeleteUser(@RequestBody List<Long> ids){
        log.info("Delete a batch of users: {}", ids);
        userService.batchDeleteUser(ids);
        return Result.success();
    }

    @PostMapping("/editOrAddUser")
    public Result editOrAddUser(@RequestBody User user){
        log.info("Edit or add a User: {}",user);
        userService.editOrAddUser(user);
        return Result.success();
    }
}
