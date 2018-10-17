package com.jiudian.manage.service;

import com.jiudian.manage.mapper.UserMapper;
import com.jiudian.manage.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {
    @Autowired
    UserMapper userMapper;

    public int add(User user){
        int insert = userMapper.insert(user);
        return insert;
    }
}
