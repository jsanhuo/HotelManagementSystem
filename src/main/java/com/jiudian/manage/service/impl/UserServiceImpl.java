package com.jiudian.manage.service.impl;

import com.jiudian.manage.mapper.UserMapper;
import com.jiudian.manage.model.User;
import com.jiudian.manage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserMapper userMapper;

    public boolean addUser(String username,String password,String power){
        User user = new User();
        user.setUsername(username);
        user.setPassword(password);
        user.setPower(Integer.parseInt(power));
        int insert = userMapper.insert(user);
        return insert>0?true:false;
    }

}
